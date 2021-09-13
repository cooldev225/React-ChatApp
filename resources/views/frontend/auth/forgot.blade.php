@extends('frontend.layouts.empty')
@section('content')
<link rel="stylesheet" type="text/css" href="/vuexy/app-assets/css/plugins/forms/form-validation.css">
<link rel="stylesheet" type="text/css" href="/vuexy/app-assets/css/pages/page-auth.css">


<div class="auth-wrapper auth-v2">
	<div class="auth-inner row m-0">
		<!-- Brand logo--><a class="brand-logo" href="#">
		<div class="login-content-header"><img class="image-fluid" src="/chat/images/logo/landing-logo.png" alt="images"></div>
		</a>
		<!-- /Brand logo-->
		<!-- Left Text-->
		<div class="d-none d-lg-flex col-lg-8 align-items-center p-5">
			<div class="w-100 d-lg-flex align-items-center justify-content-center px-5"><img class="img-fluid" src="/vuexy/app-assets/images/pages/reset-password-v2.svg" alt="Register V2" /></div>
		</div>
		<!-- /Left Text-->
		<!-- Reset password-->
		<div class="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
			<div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
				<h2 class="card-title fw-bold mb-1">Reset Password 🔒</h2>
				<p class="card-text mb-2">Your new password must be different from previously used passwords</p>
				<form class="auth-forgot-password-form mt-2" action="/forgot" method="POST">
					<input type="hidden" name="_token" id="csrf-token" value="{{ Session::token() }}" />
					<div class="mb-1">
						<label for="forgot-password-email" class="form-label">Email</label>
						<input type="text" class="form-control" id="email" name="email" placeholder="john@example.com" aria-describedby="forgot-password-email" tabindex="1" autofocus />
					</div>
					<button class="btn btn-primary w-100" tabindex="2">Send reset link</button>
				</form>

				<p class="text-center mt-2">
					<a href="/login"> <i data-feather="chevron-left"></i> Back to login </a>
				</p>
			</div>
		</div>
		<!-- /Reset password-->
	</div>
</div>





<!-- BEGIN: Page Vendor JS-->
<script src="/vuexy/app-assets/vendors/js/forms/validation/jquery.validate.min.js"></script>
<!-- END: Page Vendor JS-->

<!-- BEGIN: Page JS-->
<script src="/vuexy/app-assets/js/scripts/pages/page-auth-forgot-password.js"></script>
<!-- END: Page JS-->
@endsection
