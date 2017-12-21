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
		bloki: [
			["Nazwa Bloku","ikona.png","jednostka",ID,obsługa kolorów,min,max,invert,range],//Blok1
			["Nazwa Bloku","ikona.png","jednostka",ID,obsługa kolorów,min,max,invert,range],//Blok2
			["Nazwa Bloku","ikona.png","jednostka",ID,obsługa kolorów,min,max,invert,range],//Blok3
			["Nazwa Bloku","ikona.png","jednostka",ID,obsługa kolorów,min,max,invert,range],//Blok4
			["Nazwa Bloku","ikona.png","jednostka",ID,obsługa kolorów,min,max,invert,range],//Blok5
			["Nazwa Bloku","ikona.png","jednostka",ID,obsługa kolorów,min,max,invert,range],//Blok6
		],
  }
},
```
obsługa kolorów - true/false (bool) włączenie lub wyłączenie kolorów zależnych od stanu.<br>
min - (integer) wartość dla jakiej ma być kolor czerwony.<br>
max - (integer) wartość dla jakiej ma być kolor zielony.<br>
invert - true/false (bool) przy włączonej opcji dla minimum jest zielony a dla maximum jest czerwony.<br>
range - zakres kolorów według HSL:
0 - czerwony
60 - żółty
120 - zielony
180 - błękitny
240 - niebieski
300 - różowy
360 - czerwony

Kolor zawsze startuje od 0 czyli czerwonego do ustawienia jest tylko drugi graniczny kolor!

dla range=240
kolory będą przechodzić tak:
czerwony - żółty - zielony - błękitny - niebieski (dla inverted bedzie odwrotnie)

Nie trzeba podawać pełnego zakresu do obsługi kolorów, jesli mamy wartości od 0 do 1000 a wiemy że poniżej 200 jest już stan zły(czerwony kolor) a od 800 jest stan dobry(zielony kolor) to w 'min' wystarczy wpisać 200 a 'max' 800. Wtedy kolor będzie sie zmieniał dynamicznie w przedziale 200-800 a poza tym zakresem będą odpowiednie kolory na stałe.

Ikony proponuję w rozmiarze 100x100 oczywiście przezroczyty .png
