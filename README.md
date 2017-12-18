# KlimatAmpio

## Instalacja
```
git clone https://github.com/dajogzum/Klimatampio
```

## Aktualizacja
```
cd ../modules/Klimatampio
git pull
```
### Aktualizacja jeśli były zmieniane pliki lokalnie<br>
```
cd ../modules/Klimatampio
git reset --hard
git clean -df
git pull
```
## Config
```
{
  header: "YOUR_HEADER",
  module: "Klimatampio",
  position: "top_right",
  config:{
    ip: "SERVER_IP",
    blok_1: ["Tytuł","ikonka.png","Jednostka",ID],
    blok_2: ["Tytuł","ikonka.png","Jednostka",ID],
    blok_3: ["Tytuł","ikonka.png","Jednostka",ID],
    blok_4: ["Tytuł","ikonka.png","Jednostka",ID],
    blok_5: ["Tytuł","ikonka.png","Jednostka",ID],
    blok_6: ["Tytuł","ikonka.png","Jednostka",ID],
  }
},
```
Ikony proponuję w rozmiarze 100x100 oczywiście przezroczyty .png
