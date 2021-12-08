<?php
namespace App\Http\Clients;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Rest\ApiContext;
class PayPalClient
{
    /**
     * Returns PayPal HTTP context instance with environment that has access
     * credentials context. Use this instance to invoke PayPal APIs, provided the
     * credentials have access.
     */
    public function context()
    {
        return new ApiContext($this->credentials());
    }
    /**
     * Set up and return PayPal PHP SDK environment with PayPal access credentials.
     *
     * Paste your client_id and client secret as below
     */
    protected function credentials()
    {
        $clientId     = 'AVrTY9IbOorMiALM0KXOlNd9TN6T5RyZjowCqRu9yQ92cWZxDRt_kYXX-FpXs-W5ACPn7lRaGY4nc37Z';
        $clientSecret = 'ENEa0ol2_LjtwO44aio95TXf8H5ys2TbXcHFRKHHaEnOMIXk5Wt6QQDkZtNI4ywPtxGxCQhYbf8ANU6j';
        return new OAuthTokenCredential($clientId, $clientSecret);
    }
}