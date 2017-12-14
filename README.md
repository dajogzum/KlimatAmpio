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
  module: "Klimatampio",
  position: "top_right",
  config:{
    ip: "SERVER_IP",
    id1: "DEVICE_ID",
    id2: "DEVICE_ID",
    id3: "DEVICE_ID",
  }
},
```
