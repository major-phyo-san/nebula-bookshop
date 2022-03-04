<!DOCTYPE html>
<html>
    <head>
        <title>{{config('app.name')}}</title>
    </head>
    <body>
        <div>
            <h1>Admins Login form</h1>
            <form method="POST" action="/mgmt/login">
                @csrf
                <input id="email" type="email" name="email">
                <input id="password" type="password" name="password">
                <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                <button type="submit" class="btn btn-primary">Log in</button>
                {{session('message')}}
            </form>
        </div>
    </body>
</html>
