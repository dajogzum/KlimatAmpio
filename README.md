# KlimatAmpio

## Instalacja
```
git clone https://github.com/dajogzum/KlimatAmpio
```

## Aktualizacja
```
cd ../modules/klimatampio
git pull
```
### Aktualizacja jeśli były zmieniane pliki lokalnie<br>
```
cd ../modules/alertsnstats
git reset --hard
git pull
```
## Config
```
{
  module: "klimatampio",
  position: "top_right",
  config:{
    ip: "SERVER_IP",
    id: "DEVICE_ID",
  }
},
```
