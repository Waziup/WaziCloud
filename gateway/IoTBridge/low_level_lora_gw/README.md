Low-cost LoRa gateway with Raspberry
====================================

Please consult the web page: http://cpham.perso.univ-pau.fr/LORA/RPIgateway.html

**NEW**: get the zipped SD card image (Raspbian Jessie) with all the advanced features already installed and working out-of-the-box with the Arduino_LoRa_Simple_temp example on a demo ThingSpeak channel.

[raspberrypi-jessie-WAZIUP-demo.dmg.zip](http://cpham.perso.univ-pau.fr/LORA/WAZIUP/raspberrypi-jessie-WAZIUP-demo.dmg.zip)

- Based on Raspbian Jessie 
- Supports Raspberry 1B+, RPI2 and RPI3
- Includes all the advanced features described in the gw_advanced github
- Get the zipped image, unzip it, install it on an 8GB SD card, see [this tutorial](https://www.raspberrypi.org/documentation/installation/installing-images/) from www.raspberrypi.org
- Plug the SD card into your Raspberry
- Connect a radio module (see http://cpham.perso.univ-pau.fr/LORA/RPIgateway.html)
- Power-on the Raspberry
- The LoRa gateway starts automatically when RPI is powered on
- By default, incoming data are uploaded to the [WAZIUP ThingSpeak demo channel](https://thingspeak.com/channels/123986)
- Works out-of-the-box with the [Arduino_LoRa_Simple_temp sketch](https://github.com/CongducPham/LowCostLoRaGw/tree/master/Arduino/Arduino_LoRa_Simple_temp)

There are also 2 tutorial videos on YouTube:

- [Build your low-cost, long-range IoT device with WAZIUP](https://www.youtube.com/watch?v=YsKbJeeav_M)
- [Build your low-cost LoRa gateway with WAZIUP](https://www.youtube.com/watch?v=peHkDhiH3lE)

that show in images all the steps to build the whole framework from scratch.

Install Raspbian Wheezy or Jessie
=================================

Fisrt install a Raspberry with Raspbian, Jessie is recommended. 

then (you need to have Internet access on your Raspberry):

	> sudo apt-get update
	> sudo apt-get upgrade

Jessie has been tested on RPI1, RPI2 and RPI3, and works great.

Wheezy has been tested on RPI1 and RPI2 and works great. Wheezy on RPI3 is not recommended because built-in WiFi and Bluetooth will not work properly.

We recommend buying either RPI2 or RPI3. RPI3 with Jessie has built-in WiFi and Bluetooth so it is definitely a good choice. In addition RPI3 with Jessie will have a better support lifetime. 

Connect a radio module to Raspberry
===================================

You have to connect a LoRa radio module to the Raspberry's GPIO header. Just connect the corresponding SPI pin (MOSI, MISO, CLK, CS). Of course you also need to provide the power (3.3v) to the radio module. You can have a look at the "Low-cost-LoRa-GW-step-by-step" tutorial in our tutorial repository (https://github.com/CongducPham/tutorials).

Install the low-level LoRa gateway
==================================

Log as **pi** user on your Raspberry using ssh or connect a display and a keyboard. To get all the low-level LoRa gateway files you can use svn:

	> svn checkout https://github.com/Waziup/Platform/trunk/gateway/IoTBridge/low_level_lora_gw lora_gateway
	
That will create the lora_gateway folder and get all the file of (GitHub) Waziup/Platform/gateway/IoTBridge/low_level_lora_gw in it. Then:

	> cd lora_gateway

Note that you may have to install svn before being able to use the svn command:

	> sudo apt-get install subversion
	
Compiling the low-level gateway program
---------------------------------------	 	
    
DO NOT modify the lora_gateway.cpp file unless you know what you are doing. Check the radio.makefile file to indicate whether your radio module uses the PA_BOOST amplifier line or not (which means it uses the RFO line). HopeRF RFM92W/95W or inAir9B or NiceRF1276 or a radio module with +20dBm possibility (the SX1272/76 has +20dBm feature but some radio modules that integrate the SX1272/76 may not have the electronic to support it) need the -DPABOOST. Both Libelium SX1272 and inAir9 (not inAir9B) do not use PA_BOOST. You can also define a maximum output power to stay within transmission power regulations of your country. For instance, if you do not define anything, then the output power is set to 14dBm (ETSI european regulations), otherwise use -DMAX_DBM=10 for 10dBm. Then:

	> make lora_gateway

If you are using a Raspberry v2 or v3 :

	> make lora_gateway_pi2

To launch the gateway

	> sudo ./lora_gateway

On Raspberry v2 or v3 a symbolic link will be created that will point to lora_gateway_pi2.

By default, the gateway runs in LoRa mode 1 and has address 1.

You can have a look at the "Low-cost-LoRa-GW-step-by-step" tutorial in our tutorial repository (https://github.com/CongducPham/tutorials).

Adding LoRa gateway's post-processing features
==============================================

Look at the "high_level_lora_gateway" folder and follow the README.

Mounting your Dropbox folder
============================

With sshfs:

- look at http://mitchtech.net/dropbox-on-raspberry-pi-via-sshfs/. No need of "sudo gpasswd -a pi fuse" on Jessie.
	
	> sudo apt-get install sshfs
	
- then allow option 'user_allow_other' in /etc/fuse.conf
	
with Dropbox uploader:

- look at http://anderson69s.com/2014/02/18/raspberry-pi-dropbox/
- look at http://raspi.tv/2013/how-to-use-dropbox-with-raspberry-pi
- look at https://github.com/andreafabrizi/Dropbox-Uploader
- but not tested yet and not supported yet	

ANNEX.A
=======

Pre-defined LoRa modes (from initial Libelium SX1272.h)

| mode | BW | SF |
|------|----|----|
| 1    | 125| 12 |
| 2    | 250| 12 |
| 3    | 125| 10 |
| 4    | 500| 12 |
| 5    | 250| 10 |
| 6    | 500| 11 |
| 7    | 250|  9 |
| 8    | 500|  9 |
| 9    | 500|  7 |
| 10   | 500|  8 |


Pre-defined channels in 868MHz, 915MHz and 433MHz band (most of them from initial Libelium SX1272.h, except those marked with *)

| ch | F(MHz) | ch | F(MHz) | ch | F(MHz) |
|----|--------|----|--------|----|--------|
| 04 | 863.2* | 00 | 903.08 | 00 | 433.3* |
| 05 | 863.5* | 01 | 905.24 | 01 | 433.6* |
| 06 | 863.8* | 02 | 907.40 | 02 | 433.9* |
| 07 | 864.1* | 03 | 909.56 | 03 | 434.3* |
| 08 | 864.4* | 04 | 911.72 |  - |   -    |
| 09 | 864.7* | 05 | 913.88 |  - |   -    |
| 10 | 865.2  | 06 | 916.04 |  - |   -    |
| 11 | 865.5  | 07 | 918.20 |  - |   -    |
| 12 | 865.8  | 08 | 920.36 |  - |   -    |
| 13 | 866.1  | 09 | 922.52 |  - |   -    |
| 14 | 866.4  | 10 | 924.68 |  - |   -    |
| 15 | 867.7  | 11 | 926.84 |  - |   -    |
| 16 | 867.0  | 12 | 915.00 |  - |   -    |
| 17 | 868.0  |  - |   -    |  - |   -    |
| 18 | 868.1* |  - |   -    |  - |   -    |
|  - |   -    |  - |   -    |  - |   -    |


	
WARNING
=======

- There is currently no control on the transmit time for both gateway and end-device. When using the library to create devices, you have to ensure that the transmit time of your device is not exceeding the legal maximum transmit time defined in the regulation of your country.

- Although 900MHz band is supported (mostly for the US ISM band), the library does not implement the frequency hopping mechanism nor the limited dwell time.

Tutorial materials
==================

Go to https://github.com/CongducPham/tutorials and look for the "Low-cost-LoRa-GW-step-by-step" tutorial.

Look at our [FAQ](https://github.com/CongducPham/tutorials/blob/master/FAQ.pdf)!


Enjoy!
C. Pham