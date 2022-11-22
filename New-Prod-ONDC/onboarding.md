##   ONDC ONBOARDING CLI TOOL

* This utility has been tested on Win 10 and Suse Enterprise 11 (JRE 16 and 18) 
* Pre-requisite for this utility is to have Java Runtime Environment
* Please [Download Jar](ondc-onboarding.jar) and follow below mentioned documentation.

This tool is designed to help the network participants in Onboarding process.   This covers step 7 to step 11 from [Onboarding Document](https://github.com/ONDC-Official/developer-docs/blob/main/registry/Onboarding%20of%20Participants.md).  It is a java jar file which takes ``subscriber_id`` as input from the user and generates the ``signing keys``, ``encryption keys``, ``request_id`` and signs request id and creates ``ondc-site-verification.html`` programmatically.  All will be stored in different files.  This utility is compatible for windows platform as well unix platform.


### Option 1 to use as a Docker container

`docker run -p 8001:9001 -it proteantech/ondc-onboarding:v1.0`

### Option 2 to use as Jar file

### HOW TO USE ONDC ONBOARDING CLI TOOL

Steps --

1.	Open command prompt or dollar prompt in your system and go to the Directory where jar file is copied.
	![image](https://user-images.githubusercontent.com/105848220/191972868-939ddb64-b3e4-40bc-b811-21fa6a2c75a8.png)
2.	Type the command java -jar ondc-onboarding.jar and press enter.
 ![image](https://user-images.githubusercontent.com/105848220/191973151-6aef3bb2-1741-425d-b5c3-1b8a28a936f9.png)
3.	The system will prompt you to press any key to continue.
![image](https://user-images.githubusercontent.com/105848220/191973338-7be0500d-69dc-4bb7-8f4e-69fb90a58cb3.png)
4.	After pressing any key System will prompt you to  enter the subscriber id.
![image](https://user-images.githubusercontent.com/105848220/191974098-dc05ed46-54f2-47e9-9e6c-703392a8cdff.png)
Here we have entered mysite.in as subscriber id
5.	On generate the system will generate directory ondc in the directory where the jar file is copied, in that directory, 4 files will be generated, namely
*   a.	sign-key-pairs.json  :- This contains signing private key and signing public key``
*   b.	requestId.json:- UUID file which should be posted in JSON as request id.``
*   c.	encryption-key-pairs.json:- Contains encryption private key and public key which will be used in /on_subscribe``
*   d.	ondc-site-verification.html:- This contains sign which will be used for signature and which should be copied in directory https://<<subscriber_id>>/ondc-site-verification.html``
![image](https://user-images.githubusercontent.com/105848220/191975342-e98c1c83-0fe8-4c99-a17b-987b490c771f.png)
6. In case the directory is already present the system will prompt you for rewriting the keys file.  Please press Y to overwrite.
![image](https://user-images.githubusercontent.com/105848220/191975515-5eca8c99-9359-470c-81d9-6f704d086f75.png)
