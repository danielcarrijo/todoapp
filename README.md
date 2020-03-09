# todoapp

A simple TO-DO APP to manage tasks (where you can add a title, description and relevance) as well as their subitems. 


## Getting Started

Clone the project repository by running the command below if you use SSH

```bash
git clone git@github.com:danielcarrijo/todoapp.git
```

If you use https, use this instead

```bash
git clone https://github.com/danielcarrijo/todoapp.git
```

After cloning, run:

```bash
composer install
```

```bash
npm install
```

Duplicate `.env.example` and rename it `.env`

Then run:

```bash
php artisan key:generate
```

### Prerequisites

Be sure to fill in your database details in your `.env` file before running the migrations:

```bash
php artisan migrate
```

And finally, start the application:

```bash
php artisan serve
```

and visit [http://localhost:8000](http://localhost:8000) to see the application in action.

## Built With

* [Laravel](https://laravel.com) - The PHP Framework For Web Artisans
* [React](https://reactjs.org) - A JavaScript library for building user interfaces
