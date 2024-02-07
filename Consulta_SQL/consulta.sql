Ejercicio SQL
Escribir una consulta SQL que traiga todos los clientes que han comprado en total más de 100,000$ en los últimos 12 meses usando las siguientes tablas: 

Clientes: ID, Nombre, Apellido

Ventas: Fecha, Sucursal, Numero_factura, Importe, Id_cliente

SELECT C.ID, C.Nombre, C.Apellido
FROM Clientes C INNER JOIN Ventas V ON C.ID=V.Id_cliente
WHERE v.fecha BETWEEN '2023/02/06' AND '2024/02/06'
GROUP BY C.ID, C.Nombre, C.Apellido
HAVING SUM(V.Importe) > 100000

