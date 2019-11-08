set term png enhanced background rgb 'white'
set output 'cached.png'
set title "Response time vs. concurrency"
set ylabel "response time (ms)"
set xlabel "number of concurrent requests"
plot 'concperf.data' using 1:2 with lines title "response time (single request)", 'concperf.data' using 1:3 with lines title "response time (across concurrent requests)"
