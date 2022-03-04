<!DOCTYPE html>
<html>
    <head>
        <title>{{config('app.name')}}</title>
    </head>
    <body>
        <div>
            <h1>Admins Area</h1>
        </div>
        <form method="POST" action="/mgmt/logout">
            @csrf
            <button type="submit">Logout</button>
        </form>
    </body>
</html>
