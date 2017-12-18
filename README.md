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
    id1: "DEVICE_ID",//temperatura
    id2: "DEVICE_ID",//ciśnienie
    id3: "DEVICE_ID",//wilgotność
    id4: "DEVICE_ID",//licznik
    id5: "DEVICE_ID",//moc
    id6: "DEVICE_ID",//wilgotność w ogrodzie
  }
},
```
