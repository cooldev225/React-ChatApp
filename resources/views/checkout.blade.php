@section('checkout')
<div class="content">
    <div class="links">
        <div id="paypal-button"></div>
    </div>
</div>
<script src="https://www.paypalobjects.com/api/checkout.js"></script>
<script type="text/javascript">

</script>
<script>
  paypal.Button.render({
    env: 'sandbox', // Or 'production'
    style: {
      size: 'medium',
      color: 'gold',
      shape: 'pill',
    },
    // Set up the payment:
    // 1. Add a payment callback
    payment: function (data, actions) {
      // 2. Make a request to your server
      return actions.request.post('/api/create-paypal-transaction', {
          "_token": "{{ csrf_token() }}"
      })
        .then(function (res) {
          // 3. Return res.id from the response
          // console.log(res);
          return res.id
        })
    },
    // Execute the payment:
    // 1. Add an onAuthorize callback
    onAuthorize: function (data, actions) {
      // 2. Make a request to your server
      return actions.request.post('/api/confirm-paypal-transaction', {
        "_token": "{{ csrf_token() }}",
        payment_id: data.paymentID,
        payer_id: data.payerID
      })
        .then(function (res) {
          console.log(res)
          alert('Payment successfully done!!')
          // 3. Show the buyer a confirmation message.
        })
    }
  }, '#paypal-button')
</script>
@endsection