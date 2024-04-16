# Тестовое задание

В БД имеется информация о 5000 покупателей. Разработчик добавил страницу со списком всех покупателей. Необходимо доделать этот список, добавив пагинацию - по 20 записей на страницу с разбивкой по 10 страниц.

![Результат](./result.png)



## Запуск проекта

Для соединения с Postgresql используется переменная окружения `APP_PG_URL` 
(например: `postgresql://user:password@localhost:5432/test_pagination?sslmode=disable`). 

Для загрузки данных в БД используйте файл `test_pagination_localhost-dump.sql` (например: `psql -h localhost -U user -d test_pagination -f test_pagination_localhost-dump.sql`).
