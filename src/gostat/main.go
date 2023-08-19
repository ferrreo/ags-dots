package main

import (
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/mem"
)

func main() {

	t := 3 * time.Second
	if len(os.Args) > 1 {
		tt, err := time.ParseDuration(os.Args[1])
		if err != nil {
			panic(err)
		}
		t = tt
	}

	v, _ := mem.VirtualMemory()
	byteToGiga := 1000000000.0
	usedMem := float64(v.Total-v.Available) / byteToGiga
	cpuTemp := getCpuTemp()
	fmt.Printf("{ \"mem\":\"%.1f\", \"cpu\": \"%.1f\", \"cputemp\": \"%d\" }\n", usedMem, 0.0, cpuTemp)
	for {
		v, _ := mem.VirtualMemory()
		usedMem := float64(v.Total-v.Available) / byteToGiga
		cpuTemp := getCpuTemp()
		c, _ := cpu.Percent(t, false)
		fmt.Printf("{ \"mem\":\"%.1f\", \"cpu\": \"%.1f\", \"cputemp\": \"%d\" }\n", usedMem, c[0], cpuTemp)
	}
}

func getCpuTemp() int {
	var (
		isCoreTemp bool
		isK10Temp  bool
		cpuTempDir string
	)

	hwms, err := os.ReadDir("/sys/class/hwmon")
	if err != nil {
		return 0
	}
	for _, e := range hwms {
		hwmn := "/sys/class/hwmon/" + e.Name() + "/"
		f, err := os.ReadFile(hwmn + "name")
		if err != nil {
			return 0
		}
		if string(f) == "coretemp\n" {
			isCoreTemp = true
			cpuTempDir = hwmn
			break
		}
		if string(f) == "k10temp\n" {
			isK10Temp = true
			cpuTempDir = hwmn
			break
		}
	}

	if isK10Temp {
		return getK10Temp(cpuTempDir)
	} else if isCoreTemp {
		return getCoreTemp(cpuTempDir)
	}
	return 0
}

func getK10Temp(cpuTempDir string) int {
	d, err := os.ReadDir(cpuTempDir)
	if err != nil {
		return 0
	}

	for _, e := range d {
		fn := e.Name()
		if strings.HasPrefix(fn, "temp") && strings.HasSuffix(fn, "_label") {
			f, err := os.ReadFile(cpuTempDir + fn)
			if err != nil {
				return 0
			}
			if string(f) == "Tctl\n" {
				t, err := os.ReadFile(cpuTempDir + strings.Replace(fn, "_label", "_input", -1))
				if err != nil {
					return 0
				}
				tp, err := strconv.Atoi(string(t[:len(t)-2]))
				if err != nil {
					return 0
				}
				return int(tp / 100)
			}
			break
		}
	}
	return 0
}

func getCoreTemp(cpuTempDir string) int {
	d, err := os.ReadDir(cpuTempDir)
	if err != nil {
		return 0
	}
	var (
		temp  int
		count float64
	)
	for _, e := range d {
		fn := e.Name()
		if strings.HasPrefix(fn, "temp") && strings.HasSuffix(fn, "_input") {
			f, err := os.ReadFile(cpuTempDir + fn)
			if err != nil {
				return 0
			}
			t, err := strconv.Atoi(string(f[:len(f)-1]))
			if err != nil {
				return 0
			}
			temp += t
			count++
		}
	}
	return int(math.Round(float64(temp)/count)) / 1000
}
