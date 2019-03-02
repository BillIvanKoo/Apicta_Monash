from scapy.all import *
from scapy_http.http import *

pkts = rdpcap('example.pcap')

print("time:", datetime.fromtimestamp(pkts[0].time))

no = 0
tcp_no = 0
http_no = 0
udp_no = 0
sz = 0
tcp_sz = 0
http_sz = 0
udp_sz = 0
# ip_src = []
# ip_dst = []
# ports = []


for pkt in pkts:
    no += 1
    sz += len(pkt)
    if pkt.haslayer(TCP):
        tcp_no += 1
        tcp_sz += len(pkt)
    elif pkt.haslayer(HTTP):
        http_no += 1
        http_sz += len(pkt)
    elif pkt.haslayer(UDP):
        udp_no += 1
        udp_sz += len(pkt)

print("total packet", no)
print("tcp no", tcp_no)
print("http no", http_no)
print("udp no", udp_no)
print("total size", sz, 'byte')
print("tcp size", tcp_sz, 'byte')
print("http size", http_sz, 'byte')
print("udp size", udp_sz, 'byte')