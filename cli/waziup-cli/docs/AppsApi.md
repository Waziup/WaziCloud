# swagger_client.AppsApi

All URIs are relative to *https://waziup.io*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apps_get**](AppsApi.md#apps_get) | **GET** /apps | 
[**apps_id_containers_get**](AppsApi.md#apps_id_containers_get) | **GET** /apps/{id}/containers | 
[**apps_id_delete**](AppsApi.md#apps_id_delete) | **DELETE** /apps/{id} | 
[**apps_id_get**](AppsApi.md#apps_id_get) | **GET** /apps/{id} | 
[**apps_id_post**](AppsApi.md#apps_id_post) | **POST** /apps/{id} | 
[**apps_id_put**](AppsApi.md#apps_id_put) | **PUT** /apps/{id} | 
[**apps_post**](AppsApi.md#apps_post) | **POST** /apps | 


# **apps_get**
> list[App] apps_get()



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.AppsApi()

try: 
    api_response = api_instance.apps_get()
    pprint(api_response)
except ApiException as e:
    print "Exception when calling AppsApi->apps_get: %s\n" % e
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**list[App]**](App.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apps_id_containers_get**
> Process apps_id_containers_get(id)



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.AppsApi()
id = 56 # int | 

try: 
    api_response = api_instance.apps_id_containers_get(id)
    pprint(api_response)
except ApiException as e:
    print "Exception when calling AppsApi->apps_id_containers_get: %s\n" % e
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**|  | 

### Return type

[**Process**](Process.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apps_id_delete**
> apps_id_delete(id)



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.AppsApi()
id = 56 # int | 

try: 
    api_instance.apps_id_delete(id)
except ApiException as e:
    print "Exception when calling AppsApi->apps_id_delete: %s\n" % e
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

# **apps_id_get**
> App apps_id_get(id)



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.AppsApi()
id = 56 # int | 

try: 
    api_response = api_instance.apps_id_get(id)
    pprint(api_response)
except ApiException as e:
    print "Exception when calling AppsApi->apps_id_get: %s\n" % e
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**|  | 

### Return type

[**App**](App.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apps_id_post**
> apps_id_post(body, id)



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.AppsApi()
body = swagger_client.AppUpdateRequest() # AppUpdateRequest | 
id = 56 # int | 

try: 
    api_instance.apps_id_post(body, id)
except ApiException as e:
    print "Exception when calling AppsApi->apps_id_post: %s\n" % e
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**AppUpdateRequest**](AppUpdateRequest.md)|  | 
 **id** | **int**|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apps_id_put**
> apps_id_put(body, id)



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.AppsApi()
body = swagger_client.AppActionRequest() # AppActionRequest | 
id = 56 # int | 

try: 
    api_instance.apps_id_put(body, id)
except ApiException as e:
    print "Exception when calling AppsApi->apps_id_put: %s\n" % e
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**AppActionRequest**](AppActionRequest.md)|  | 
 **id** | **int**|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apps_post**
> apps_post(body)



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.AppsApi()
body = swagger_client.AppCreateRequest() # AppCreateRequest | 

try: 
    api_instance.apps_post(body)
except ApiException as e:
    print "Exception when calling AppsApi->apps_post: %s\n" % e
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**AppCreateRequest**](AppCreateRequest.md)|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

