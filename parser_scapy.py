from scapy.all import *
from scapy_http.http import *
import json
import requests
import sys

pkts = rdpcap(sys.argv[1])

packet_data = {
    "timestamp": pkts[0].time,
    "total": 0,
    "total_tcp": 0,
    "total_http": 0,
    "total_udp": 0,
    "size": 0,
    "size_tcp": 0,
    "size_http": 0,
    "size_udp": 0,
    # "ip_src": set(),
    # "ip_src_tcp": set(),
    # "ip_src_http": set(),
    # "ip_src_udp": set(),
    # "ip_dst": set(),
    # "ip_dst_tcp": set(),
    # "ip_dst_http": set(),
    # "ip_dst_udp": set(),
    "port_src": set(),  # tcp+udp
    "port_src_tcp": set(),
    "port_src_udp": set(),
    "port_dst": set(),  # tcp+udp
    "port_dst_tcp": set(),
    "port_dst_udp": set(),
    "mac_src": set(),
    "mac_dst": set()
}

for pkt in pkts:

    packet_data["total"] += 1
    packet_data["size"] += len(pkt)
    # ip = False
    mac_src = pkt.src
    mac_dst = pkt.dst
    if mac_src not in packet_data["mac_src"]:
        packet_data["mac_src"].add(mac_src)
    if mac_dst not in packet_data["mac_dst"]:
        packet_data["mac_dst"].add(mac_dst)

    # if IP in pkt:
    #     ip = True
    #     ip_src = pkt[IP].src
    #     ip_dst = pkt[IP].dst
    #     if ip_src not in packet_data["ip_src"]:
    #         packet_data["ip_src"].add(ip_src)
    #     if ip_dst not in packet_data["ip_dst"]:
    #         packet_data["ip_dst"].add(ip_dst)

    if pkt.haslayer(TCP):
        packet_data["total_tcp"] += 1
        packet_data["size_tcp"] += len(pkt)
        port_src_tcp = pkt[TCP].sport
        port_dst_tcp = pkt[TCP].dport

        if port_src_tcp not in packet_data["port_src_tcp"]:
            packet_data["port_src_tcp"].add(port_src_tcp)
        if port_dst_tcp not in packet_data["port_dst_tcp"]:
            packet_data["port_dst_tcp"].add(port_dst_tcp)
        
        if port_src_tcp not in packet_data["port_src"]:
            packet_data["port_src"].add(port_src_tcp)
        if port_dst_tcp not in packet_data["port_dst"]:
            packet_data["port_dst"].add(port_dst_tcp)

        # if ip is True:
        #     if ip_src not in packet_data["ip_src_tcp"]:
        #         packet_data["ip_src_tcp"].add(ip_src)
        #     if ip_dst not in packet_data["ip_dst_tcp"]:
        #         packet_data["ip_dst_tcp"].add(ip_dst)

    if pkt.haslayer(HTTP):
        packet_data["total_http"] += 1
        packet_data["size_http"] += len(pkt)

        # if ip is True:
        #     if ip_src not in packet_data["ip_src_http"]:
        #         packet_data["ip_src_http"].add(ip_src)
        #     if ip_dst not in packet_data["ip_dst_http"]:
        #         packet_data["ip_dst_http"].add(ip_dst)

    if pkt.haslayer(UDP):
        packet_data["total_udp"] += 1
        packet_data["size_udp"] += len(pkt)
        port_src_udp = pkt[UDP].sport
        port_dst_udp = pkt[UDP].dport
        
        if port_src_udp not in packet_data["port_src_udp"]:
            packet_data["port_src_udp"].add(port_src_udp)
        if port_dst_udp not in packet_data["port_dst_udp"]:
            packet_data["port_dst_udp"].add(port_dst_udp)
        
        if port_src_udp not in packet_data["port_src"]:
            packet_data["port_src"].add(port_src_udp)
        if port_dst_udp not in packet_data["port_dst"]:
            packet_data["port_dst"].add(port_dst_udp)
        #
        # if ip is True:
        #     if ip_src not in packet_data["ip_src_udp"]:
        #         packet_data["ip_src_udp"].add(ip_src)
        #     if ip_dst not in packet_data["ip_dst_udp"]:
        #         packet_data["ip_dst_udp"].add(ip_dst)

for key in packet_data:
    if type(packet_data[key]) == set:
        packet_data[key] = list(packet_data[key]) 

JSON_file = sys.argv[2]

with open(JSON_file, "r+") as f:
    data = json.load(f)
with open(JSON_file, "w+") as f:
    data["data"].append(packet_data)
    json.dump(data, f)

url = 'http://localhost:8888/packets/'
response = requests.post(url, json=packet_data)
print(response)