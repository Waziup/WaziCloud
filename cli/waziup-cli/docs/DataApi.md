# swagger_client.DataApi

All URIs are relative to *https://waziup.io*

Method | HTTP request | Description
------------- | ------------- | -------------
[**data_observations_get**](DataApi.md#data_observations_get) | **GET** /data/observations | 
[**data_observations_id_get**](DataApi.md#data_observations_id_get) | **GET** /data/observations/{id} | 
[**data_subscriptions_get**](DataApi.md#data_subscriptions_get) | **GET** /data/subscriptions | 
[**data_subscriptions_id_get**](DataApi.md#data_subscriptions_id_get) | **GET** /data/subscriptions/{id} | 


# **data_observations_get**
> list[Observations] data_observations_get()



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.DataApi()

try: 
    api_response = api_instance.data_observations_get()
    pprint(api_response)
except ApiException as e:
    print "Exception when calling DataApi->data_observations_get: %s\n" % e
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**list[Observations]**](Observations.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **data_observations_id_get**
> Observations data_observations_id_get(id)



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.DataApi()
id = 56 # int | 

try: 
    api_response = api_instance.data_observations_id_get(id)
    pprint(api_response)
except ApiException as e:
    print "Exception when calling DataApi->data_observations_id_get: %s\n" % e
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**|  | 

### Return type

[**Observations**](Observations.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **data_subscriptions_get**
> list[Subscription] data_subscriptions_get()



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.DataApi()

try: 
    api_response = api_instance.data_subscriptions_get()
    pprint(api_response)
except ApiException as e:
    print "Exception when calling DataApi->data_subscriptions_get: %s\n" % e
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**list[Subscription]**](Subscription.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **data_subscriptions_id_get**
> Subscription data_subscriptions_id_get(id)



### Example 
```python
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.DataApi()
id = 56 # int | 

try: 
    api_response = api_instance.data_subscriptions_id_get(id)
    pprint(api_response)
except ApiException as e:
    print "Exception when calling DataApi->data_subscriptions_id_get: %s\n" % e
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**|  | 

### Return type

[**Subscription**](Subscription.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

