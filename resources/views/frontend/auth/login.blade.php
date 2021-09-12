@extends('frontend.layouts.empty')
@section('content')
<div class="login-page1">
	<?php if(isset($errors)&&count($errors))dd($errors);?>
	<div class="container-fluid p-0">
	<div class="row">
		<div class="col-12">
		<div class="login-contain-main">
			<div class="left-page">
			<div class="login-content">
				<div class="login-content-header"><img class="image-fluid" src="/chat/images/logo/landing-logo.png" alt="images"></div>
				<h3>Hello Everyone , We are Chitchat</h3>
				<h4>Wellcome to chitchat please login to your account.</h4>
				<form class="form1" action="/login" method="post">
				<div class="form-group">
					<label class="col-form-label" for="inputEmail3">Email Address</label>
					<input class="form-control" id="inputEmail3" name="email" type="email" placeholder="Demo@123gmail.com" value="{{ old('email') }}">
					<span class="text-danger">{{ $errors->first('email') }}</span>                            
				</div>
				<div class="form-group">
					<label class="col-form-label" for="inputPassword3">Password</label><span> </span>
					<input class="form-control" id="inputPassword3" name="password" type="password" placeholder="Password" value="{{ old('password') }}">
					<span class="text-danger">{{ $errors->first('password') }}</span>                            
				</div>
				<div class="form-group">
					<div class="rememberchk">
					<input class="form-check-input" id="gridCheck1" type="checkbox">
					<label class="form-check-label ps-4" for="gridCheck1">Remember Me.</label>
					<h6 class="pull-right">Forgot Password?</h6>
					</div>
				</div>
				<div class="form-group">
					<div class="buttons"><a class="btn btn-primary button-effect" href="#" onclick="$('.form1').submit();">Login</a><a class="btn button-effect btn-signup" href="/register">SignUp</a></div>
				</div>
				</form>
				<div class="line">
				<h6>OR Connect with</h6>
				</div>
				<div class="medialogo">
				<ul>
					<li><a class="icon-btn btn-danger button-effect" href="#"><i class="fa fa-google"></i></a></li>
					<li><a class="icon-btn btn-primary button-effect" href="#"><i class="fa fa-twitter"></i></a></li>
					<li><a class="icon-btn btn-facebook button-effect" href="#"><i class="fa fa-facebook-f"></i></a></li>
				</ul>
				</div>
				<div class="termscondition">
				<h4 class="mb-0"><span>*</span>Terms and condition<b>&amp;</b>Privacy policy</h4>
				</div>
			</div>
			</div>
			<div class="right-page">
			<div class="right-login animat-rate">
				<div class="animation-block">
				<div class="bg_circle">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div class="cross"></div>
				<div class="cross1"></div>
				<div class="cross2"></div>
				<div class="dot"></div>
				<div class="dot1"></div>
				<div class="maincircle"></div>
				<div class="top-circle"></div>
				<div class="center-circle"></div>
				<div class="bottom-circle"></div>
				<div class="bottom-circle1"></div>
				<div class="right-circle"></div>
				<div class="right-circle1"></div><img class="heart-logo" src="/chat/images/login_signup/5.png" alt="login logo"/><img class="has-logo" src="/chat/images/login_signup/4.png" alt="login logo"/><img class="login-img" src="/chat/images/login_signup/1.png" alt="login logo"/><img class="boy-logo" src="/chat/images/login_signup/6.png" alt="login boy logo"/><img class="girl-logo" src="/chat/images/login_signup/7.png" alt="girllogo"/><img class="cloud-logo" src="/chat/images/login_signup/2.png" alt="login logo"/><img class="cloud-logo1" src="/chat/images/login_signup/2.png" alt="login logo"/><img class="cloud-logo2" src="/chat/images/login_signup/2.png" alt="login logo"/><img class="cloud-logo3" src="/chat/images/login_signup/2.png" alt="login logo"/><img class="cloud-logo4" src="/chat/images/login_signup/2.png" alt="login logo"/><img class="has-logo1" src="/chat/images/login_signup/4.png" alt="login logo"/>
				</div>
			</div>
			</div>
		</div>
		</div>
	</div>
	</div>
</div>
@endsection