IoT bridge code
===============

The **low_level_lora_gw** folder contains the low-level radio bridge program to be run on a Raspberry. This program receives LoRa packets from remote end-devices.

The **high_level_lora_gw** folder contains the higher level functionalities of the gateway such as data processing tasks. A typical processing task is to push received data to Internet servers or dedicated (public or private) IoT clouds. We provide a post_processing_gw.py Python script and template that already implements data uploading to various public IoT clouds. You can customize it for your own needs.
 
