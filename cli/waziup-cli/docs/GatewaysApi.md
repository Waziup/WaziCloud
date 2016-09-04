# swagger_client.GatewaysApi

All URIs are relative to *https://waziup.io*

Method | HTTP request | Description
------------- | ------------- | -------------
[**gateways_get**](GatewaysApi.md#gateways_get) | **GET** /gateways | 
[**gateways_id_delete**](GatewaysApi.md#gateways_id_delete) | **DELETE** /gateways/{id} | 
[**gateways_id_devices_get**](GatewaysApi.md#gateways_id_devices_get) | **GET** /gateways/{id}/devices | 
[**gateways_id_get**](GatewaysApi.md#gateways_id_get) | **GET** /gateways/{id} | 
[**gateways_id_put**](GatewaysApi.md#gateways_id_put) | **PUT** /gateways/{id} | 
[**gateways_post**](GatewaysApi.md#gateways_post) | **POST** /gateways | 


# **gateways_get**
> list[Gateway] gateways_get()



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.GatewaysApi()

try: 
    api_response = api_instance.gateways_get()
    pprint(api_response)
except ApiException as e:
    print "Exception when calling GatewaysApi->gateways_get: %s\n" % e
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**list[Gateway]**](Gateway.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gateways_id_delete**
> gateways_id_delete(id)



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.GatewaysApi()
id = 56 # int | 

try: 
    api_instance.gateways_id_delete(id)
except ApiException as e:
    print "Exception when calling GatewaysApi->gateways_id_delete: %s\n" % e
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gateways_id_devices_get**
> Device gateways_id_devices_get(id)



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.GatewaysApi()
id = 56 # int | 

try: 
    api_response = api_instance.gateways_id_devices_get(id)
    pprint(api_response)
except ApiException as e:
    print "Exception when calling GatewaysApi->gateways_id_devices_get: %s\n" % e
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**|  | 

### Return type

[**Device**](Device.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gateways_id_get**
> Gateway gateways_id_get(id)



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.GatewaysApi()
id = 56 # int | 

try: 
    api_response = api_instance.gateways_id_get(id)
    pprint(api_response)
except ApiException as e:
    print "Exception when calling GatewaysApi->gateways_id_get: %s\n" % e
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**|  | 

### Return type

[**Gateway**](Gateway.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gateways_id_put**
> gateways_id_put(body, id)



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.GatewaysApi()
body = swagger_client.GatewayAction() # GatewayAction | 
id = 56 # int | 

try: 
    api_instance.gateways_id_put(body, id)
except ApiException as e:
    print "Exception when calling GatewaysApi->gateways_id_put: %s\n" % e
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**GatewayAction**](GatewayAction.md)|  | 
 **id** | **int**|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gateways_post**
> Gateway gateways_post(body)



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.GatewaysApi()
body = swagger_client.Gateway() # Gateway | 

try: 
    api_response = api_instance.gateways_post(body)
    pprint(api_response)
except ApiException as e:
    print "Exception when calling GatewaysApi->gateways_post: %s\n" % e
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Gateway**](Gateway.md)|  | 

### Return type

[**Gateway**](Gateway.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

