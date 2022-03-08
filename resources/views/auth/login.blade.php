<!DOCTYPE html>
<html>
    <head>
        <title>{{config('app.name')}}</title>
    </head>
    <body>
        <div>
            <h1>User Login form</h1>
            <form method="POST" action="/login">
                @csrf
                <input id="phone_number" type="phone_number" name="phone_number">
                <input id="password" type="password" name="password">
                <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                <button type="submit" class="btn btn-primary">Log in</button>
                {{session('message')}}
            </form>
        </div>
    </body>
</html>
