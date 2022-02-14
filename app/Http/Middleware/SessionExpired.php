<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Session\Store;
use Auth;
use Session;

class SessionExpired
{
    protected $session;
    protected $timeout = 720000 * 5;

    public function __construct(Store $session) {
        $this->session = $session;
    }
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $isLoggedIn = $request->path() != 'logout';
        // var_dump($isLoggedIn);
        if(!session('lastActivityTime'))
            $this->session->put('lastActivityTime', time());
        elseif(time() - $this->session->get('lastActivityTime') > $this->timeout){
            $user = Auth::user();
            $user->logout = 1;
            $user->save();

            Auth::logout();
            $this->session->forget('lastActivityTime');

            return redirect()->route('login');

            // $cookie = cookie('intend', 'login');/
            // $cookie = cookie('intend', $isLoggedIn ? url()->current() : 'login');
            // auth()->logout();
        }
        $isLoggedIn ? $this->session->put('lastActivityTime', time()) : $this->session->forget('lastActivityTime');
        return $next($request);
    }
}
