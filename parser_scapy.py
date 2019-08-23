import os
os.sys.path.append('/home/bill/anaconda3/lib/python36.zip')
os.sys.path.append('/home/bill/anaconda3/lib/python3.6')
os.sys.path.append('/home/bill/anaconda3/lib/python3.6/lib-dynload')
os.sys.path.append('/home/bill/anaconda3/lib/python3.6/site-packages')
from scapy.all import *
from scapy_http.http import *
import sys
import json
import socketio
import time
import copy

current_milli_time = lambda: int(round(time.time() * 1000))
def get_new_packet_data(timestamp):
    return {
        "timestamp": timestamp,
        "total": 0,
        "total_tcp": 0,
        "total_http": 0,
        "total_udp": 0,
        "size": 0,
        "size_tcp": 0,
        "size_http": 0,
        "size_udp": 0,
        "segmentId": 1,
        "port_src": set(),  # tcp+udp
        "port_src_tcp": set(),
        "port_src_udp": set(),
        "port_dst": set(),  # tcp+udp
        "port_dst_tcp": set(),
        "port_dst_udp": set(),
        "mac_src": set(),
        "mac_dst": set()
    }

def pkt_callback(pkt, packet_data):
    packet_data["total"] += 1
    packet_data["size"] += len(pkt)
    mac_src = pkt.src
    mac_dst = pkt.dst
    if mac_src not in packet_data["mac_src"]:
        packet_data["mac_src"].add(mac_src)
    if mac_dst not in packet_data["mac_dst"]:
        packet_data["mac_dst"].add(mac_dst)

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

    if pkt.haslayer(HTTP):
        packet_data["total_http"] += 1
        packet_data["size_http"] += len(pkt)

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

# for pkt in pkts:

#     packet_data["total"] += 1
#     packet_data["size"] += len(pkt)
#     # ip = False
#     mac_src = pkt.src
#     mac_dst = pkt.dst
#     if mac_src not in packet_data["mac_src"]:
#         packet_data["mac_src"].add(mac_src)
#     if mac_dst not in packet_data["mac_dst"]:
#         packet_data["mac_dst"].add(mac_dst)

#     if pkt.haslayer(TCP):
#         packet_data["total_tcp"] += 1
#         packet_data["size_tcp"] += len(pkt)
#         port_src_tcp = pkt[TCP].sport
#         port_dst_tcp = pkt[TCP].dport

#         if port_src_tcp not in packet_data["port_src_tcp"]:
#             packet_data["port_src_tcp"].add(port_src_tcp)
#         if port_dst_tcp not in packet_data["port_dst_tcp"]:
#             packet_data["port_dst_tcp"].add(port_dst_tcp)
        
#         if port_src_tcp not in packet_data["port_src"]:
#             packet_data["port_src"].add(port_src_tcp)
#         if port_dst_tcp not in packet_data["port_dst"]:
#             packet_data["port_dst"].add(port_dst_tcp)

#     if pkt.haslayer(HTTP):
#         packet_data["total_http"] += 1
#         packet_data["size_http"] += len(pkt)

#     if pkt.haslayer(UDP):
#         packet_data["total_udp"] += 1
#         packet_data["size_udp"] += len(pkt)
#         port_src_udp = pkt[UDP].sport
#         port_dst_udp = pkt[UDP].dport
        
#         if port_src_udp not in packet_data["port_src_udp"]:
#             packet_data["port_src_udp"].add(port_src_udp)
#         if port_dst_udp not in packet_data["port_dst_udp"]:
#             packet_data["port_dst_udp"].add(port_dst_udp)
        
#         if port_src_udp not in packet_data["port_src"]:
#             packet_data["port_src"].add(port_src_udp)
#         if port_dst_udp not in packet_data["port_dst"]:
#             packet_data["port_dst"].add(port_dst_udp)

# for key in packet_data:
#     if type(packet_data[key]) == set:
#         packet_data[key] = list(packet_data[key]) 

# JSON_file = sys.argv[2]

# with open(JSON_file, "r+") as f:
#     data = json.load(f)
# with open(JSON_file, "w+") as f:
#     data["data"].append(packet_data)
#     json.dump(data, f)

def handle_connected(pkt_data_wrapper):
    print("IM CONNECTED")
    

def print_capture():
    print("capture")

def capture_handler(data, pkt_data_wrapper, sio, namespace):
    pd = copy.deepcopy(pkt_data_wrapper["pkt_data"])
    pkt_data_wrapper["pkt_data"]=get_new_packet_data(data)
    print(pd["timestamp"])
    # change set to list
    pd["port_src"] = list(pd["port_src"])
    pd["port_src_tcp"] = list(pd["port_src_tcp"])
    pd["port_src_udp"] = list(pd["port_src_udp"])
    pd["port_dst"] = list(pd["port_dst"])
    pd["port_dst_tcp"] = list(pd["port_dst_tcp"])
    pd["port_dst_udp"] = list(pd["port_dst_udp"])
    pd["mac_src"] = list(pd["mac_src"])
    pd["mac_dst"] = list(pd["mac_dst"])
    sio.emit("captured", data=json.dumps(pd), namespace=namespace)
    
if __name__ == "__main__":
    url = 'http://localhost:8888/'
    namespace="/capture"
    sio = socketio.Client()
    sio.connect(url, namespaces=[namespace])

    pkt_data_wrapper = {}
    pkt_data_wrapper["pkt_data"] = get_new_packet_data(int(round(time.time() )))

    sio.on("connect", namespace=namespace, handler=lambda : handle_connected(pkt_data_wrapper))
    
    sio.on("capture", namespace=namespace, handler=lambda data : capture_handler(data, pkt_data_wrapper, sio, namespace))
    
    while pkt_data_wrapper == {}:
        if pkt_data_wrapper != {}:
            break
    try:
        sniff(iface=sys.argv[1:], prn= lambda pkt: pkt_callback(pkt, pkt_data_wrapper["pkt_data"]))
    except AttributeError as e:
        print(e)