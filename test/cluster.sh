
# I assume you have a similar setup in my tests...

./etcd -s 127.0.0.1:7001 -c 127.0.0.1:4001 -d nodes/node1 -n node1 &
./etcd -s 127.0.0.1:7002 -c 127.0.0.1:4002 -C 127.0.0.1:7001 -d nodes/node2 -n node2 &
./etcd -s 127.0.0.1:7003 -c 127.0.0.1:4003 -C 127.0.0.1:7001 -d nodes/node3 -n node3
