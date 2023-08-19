const std = @import("std");
const unistd = @cImport({
    @cInclude("unistd.h");
});

pub fn main() !void {

    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();
    const args = try std.process.argsAlloc(allocator);
    defer std.process.argsFree(allocator, args);

    var pipes: [2]i32 = undefined;
    pipes = try std.os.pipe();

    const fork_pid = try std.os.fork();
    if (fork_pid == 0) {
        _ = std.os.close(pipes[0]);
        _ = try std.os.dup2(pipes[1], 1);
        const cmd_args =  [_:null]?[*:0]const u8{"cava", "-p", args[1], null};
        _ = unistd.execvp(cmd_args[0], @ptrCast(@constCast(&cmd_args))); 
        return;
    } else {
        _ = std.os.close(pipes[1]);
        const file = std.fs.File{
            .handle = pipes[0],
            .capable_io_mode = .blocking,
            .intended_io_mode = std.io.default_mode,
        };
        const stdout = std.io.getStdOut().handle;
        defer file.close();

        var buf_reader = std.io.bufferedReader(file.reader());
        var in_stream = buf_reader.reader();

        var buf: [350]u8 = undefined;
        _ = try std.os.write(stdout, "[");
        while (try in_stream.readUntilDelimiterOrEof(&buf, '\n')) |line| {
            for (0.., line) |i, elem| {
                if (elem == ';') {
                    line[i] = ',';
                }
            }
            line[line.len-1] = ']';
            _ = try std.os.write(stdout, line);
            _ = try std.os.write(stdout, "\n[");
        }
    }
}