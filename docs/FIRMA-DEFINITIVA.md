# Firma definitiva dell’APK

Repository: `CosmoNetinfo/Cosma`. Identificativo Android: `info.cosmonet.cosma`.

La chiave di distribuzione è stata creata una sola volta il 23 novembre 2026. È diversa dalla chiave temporanea usata nei test locali iniziali. I quattro secrets di GitHub Actions sono configurati; nessuna chiave privata o password è pubblicata nel repository.

Impronta SHA-256 **pubblica** del certificato:

```text
66af7a444ce36cd33e89ea43c98bd97d3a7381d6ddd533733bbbcc803fee1523
```

Questa è la firma dell’APK, distinta dalla chiave del database privato del telefono e dalla password dei backup. Per gli aggiornamenti si deve conservare la stessa firma, lo stesso identificativo e aumentare il versionCode. Il workflow applica queste regole automaticamente.

La copia privata della chiave, alias e password va conservata fuori dal repository, insieme a una seconda copia sicura. Non ricreare la chiave e non sostituire i secrets a ogni compilazione. I secrets GitHub non sono un sistema da cui scaricare nuovamente il valore della chiave.
