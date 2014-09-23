sudo umount /var/www/phonegap/lib/iphone4/
sudo rm -rf /var/www/phonegap/lib/iphone4/
sudo mkdir /var/www/phonegap/lib/iphone4/
sudo chown alex:alex /var/www/phonegap/lib/iphone4/
ifuse /var/www/phonegap/lib/iphone4/ --root
mv ~/Загрузки/AppleTaxi.ipa /var/www/phonegap/lib/iphone4/var/mobile/Downloads/AppleTaxi.ipa