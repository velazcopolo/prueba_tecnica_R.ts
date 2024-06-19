La prueba técnica consiste en desarollar una API con Node.js y TypeScript de la forma más simple posible. Adjunto un archivo llamado locations.ts que deberá importarse como una constante y que contiene datos de ciudades, distritos y número de pisos alquilados.

La prueba no tiene un tiempo máximo para presentar, simplemente avísame cuando la tengas finalizada y buscamos una hora en el calendario para revisarla juntos.



---



### Requisitos de la API:

- El código de la API debe estar contenido en un solo archivo .ts
- El proyecto puede usar un número ilimitado de otro tipo de archivos (configuraciones, .gitignore, etc)
- La API debe estar creada usando el framework Express de Node.js
- Puedes usar todas las librerías que quieras para su ejecución
- Mantén el código lo más simple y limpio posible
- Añade comentarios solo si es necesario (solo si no es evidente ya lo que hace el código)
- La API debe estar preparada para informar al usuario de un mal funcionamiento (una url mal introducida, un campo requerido que no llega...)
- Usa correctamente los verbos de la API (POST, GET)
- Usa correctamente los códigos HTML de la API (200, 400, 500)
- Intenta no usar bucles for, while, do while, intenta usar siempre filter, map y reduce
- Intenta substituir if y else por sus expresiones shorthand -> condición ? éxito : fallo // valor ?? alternativa
- Crea un archivo Makefile (y aprende a usarlo si es la primera vez) para simplificar la intalación y ejecución de la API
- Crea un repositorio público desde donde me pueda descargar la API y probarla



### Instalación y ejecución de la API:

- Desde el path del proyecto, si ejecuto **make install** se instalarán todos los requisitos para su funcionamiento (yarn, npm y similares)
- Desde el path del proyecto, se ejecuto **make dev** se iniciará la API para su desarrollo, mostrando la url y puerto para su uso
- Desde el path del proyecto, se ejecuto **make start** se generará (build) una versión estática de la API para producción



### Endpoints básicos de la API

- / -> Mostrará el contenido de locations.ts

- /cities -> Mostrará un listado de strings con los nombres de las ciudades

- /districts -> Mostrará un listado de strings con los nombres de todos los distritos de todas las ciudades



### Endpoint que devuelve los distritos de cada ciudad

- /barcelona/districts -> Mostrará un listado de strings con los nombres de todos los distritos que tengamos para Barcelona

- /Barcelona/districts -> Mostrará un listado de strings con los nombres de todos los distritos que tengamos para Barcelona

- /BarCelONA/districts -> Mostrará un listado de strings con los nombres de todos los distritos que tengamos para Barcelona

- /[cualquier ciudad que exista en locations.ts mayúsculas, minúsculas y tildes]/districts -> Mostrará un listado de strings con los nombres de todos los distritos que tengamos para esa ciudad



### Endpoint que devuelve el número de unidades que tenemos en una ciudad (sumando la de todos los distritos)

- /barcelona -> Mostrará la suma de unidades (units) que tenemos en todos los distritos de Barcelona

- /Barcelona -> Mostrará la suma de unidades (units) que tenemos en todos los distritos de Barcelona

- /BarCelONA -> Mostrará la suma de unidades (units) que tenemos en todos los distritos de Barcelona

- /[cualquier ciudad del mundo mezclando mayúsculas, minúsculas y tildes] -> Mostrará la suma de unidades (units) que tenemos en todos los distritos para esa ciudad



### Endpoint que devuelve el número de unidades que tenemos en un distrito

- /eixample -> Mostrará la suma de unidades (units) que tenemos en el distrito Eixample

- /Eixample -> Mostrará la suma de unidades (units) que tenemos en el distrito Eixample

- /EixamPLe -> Mostrará la suma de unidades (units) que tenemos en el distrito Eixample

- /[cualquier distrito de locations.ts mezclando mayúsculas, minúsculas, tildes, guiones, apóstrofes, etc] -> Mostrará la suma de unidades (units) que tenemos en ese distrito



### Endpoint que busca coincidencias entre el texto introducido y las ciudades y distritos de locations.ts

Devolverá un JSON con los campos found (true/false), name (nombre correcto tal y como lo tenemos en locations.ts), rate (coeficiente de acierto en las letras introducidas respecto al éxito), type (CITY, DISTRICT) y city (ciudad a la que pertenece)

- /search/arcelona

  ```
  {
    "found": true,
    "rate": 0.8888888888888888,
    "city": "Barcelona",
    "name": "Barcelona",
    "type": "CITY"
  }
  ```

  

- /search/Barri Sarrià-Sant Gervasi

  ```
  {
    "found": true,
    "rate": 0.76,
    "city": "Barcelona",
    "name": "Sarrià-Sant Gervasi",
    "type": "DISTRICT"
  }
  ```

  

- /search/corujera

  ```
  {
    "found": false,
    "rate": null,
    "city": null,
    "name": null,
    "type": null
  }
  ```

  