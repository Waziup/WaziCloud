set term svg enhanced background rgb 'white'
set output 'plot2.svg'
set xdata time
set timefmt "%Y-%m-%dT%H:%M:%S"
set format x "%H:%M:%.3S"
set xtics rotate by 45 offset -5.0,-3.0
set bmargin 5
set rmargin 10
set key Left

plot 'logs3.txt' using 2:1:3 with labels point offset char 5,-1 title 'logs events timings' 


