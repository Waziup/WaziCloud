<?php

namespace App;
use SoapBox\Formatter\Formatter;
use Log;

class Guzzle {    


      public static function send( $requestType , $url , $postData = null , $headers = []){

        $client = new \GuzzleHttp\Client;
       $params = [
            'headers' => $headers,
           'form_params'=>$postData,
            'verify' => false,
            //'auth' => ['5AQIGJ328OK52ILD5LNHP3P4C', 'G2Q2BQKatcSWXnZiwSC1HQmRR8+8lqY8s4ckp76JRv0'],
           ];

           try {
                       
                   $response = $client->request( strtoupper( $requestType ), $url, $params);
                     if($response->getStatusCode() == '200'){

                      //Log::debug( $response->getHeader('Content-Type'));
                          $stringResponse = $response->getBody()->getContents();
                          
                          switch ( $response->getHeader('Content-Type')[0]) {
                            case 'text/xml':
                              
                              //Log::debug( $stringResponse);

                            $formatter = Formatter::make($stringResponse, Formatter::XML);

                                return $formatter->toArray();
                              break;
                            
                            default:
                                return json_decode($stringResponse,true);
                         
                              break;
                          }
                       
                      }
           
           } catch (\GuzzleHttp\Exception\ClientException $e) {

               if ($e->hasResponse()) {
                   $stringResponse = $e->getResponse()->getBody()->getContents();
                   $data = json_decode($stringResponse,true);
                   Log::debug($data);
                   //Log::debug($data['ErrorCode']);

               }
               return false;
           }

          }

      }
       