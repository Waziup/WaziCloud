scp haproxy.cfg ubuntu@217.77.95.119:~/
ssh ubuntu@217.77.95.119 <<'ENDSSH'
sudo mv ~/haproxy.cfg /etc/haproxy/
sudo service haproxy restart
ENDSSH
