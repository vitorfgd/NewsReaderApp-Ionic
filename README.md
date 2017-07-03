App - Leitor de Notícias - IELUSC
----------
Este repositório é referente ao aplicativo para leitura de notícias criado pelo IFC em parceria com alunos da graduação do curso de Direito do Bom Jesus - IELUSC.


Como instalar o IONIC?
----------
Guia escrito seguido as instruções encontradas neste site: http://ionicframework.com/docs/v1/guide/installation.html

Para buildar para android e iOS (para criar uma build para ios é necessário estar no MacOS), que podem ou não vir junto com o ionic (dar uma olhada em http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html e http://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html).

1)
```
sudo npm install -g cordova (se está no windows, o sudo não é necessário);
```
2)
```
sudo npm install -g ionic;
```
3)
```
ionic start todo blank (este passo é necessário apenas se não existir projeto, este comando criará um novo projeto);
```
4)
```
ionic info;
```
5) As configurações do ionic utilizadas para este projeto foram:

```
global packages:

    @ionic/cli-utils : 1.3.0
    Cordova CLI      : 7.0.1
    Ionic CLI        : 3.3.0

local packages:

    @ionic/app-scripts              : 1.3.7
    @ionic/cli-plugin-cordova       : 1.3.0
    @ionic/cli-plugin-ionic-angular : 1.3.0
    Cordova Platforms               : android 6.2.3 ios 4.1.1
    Ionic Framework                 : ionic-angular 3.3.0
```
6) Para alguns comandos, será necessário o ANDROID_HOME e PATH. Para isso, execute os comandos:

```
export ANDROID_HOME=CAMINHO/ATÉ/android-sdk-macosx
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

7) Para ter certeza que todos os pluggins utilizados estão devidamente instalados e atualizados, execute:

```
ionic serve
```
Este comando deverá criar uma pasta chamada ./nodule_modules caso ela não exista. Caso você tenha problemas para executar, pode-se ainda executar o comando.

```
cordova prepare
```


Como testar?
----------
Para testes em navegador, basta fazer a clonagem deste repositório, baixá-lo para seu computador, navegar até a pasta e executar o comando 'ionic serve.'

Para testes em celulares o aplicativo já assinado e alinhado se encontra na pasta principal do trabalho sendo necessário apenas que seja feito o upload para seu celular, este celular, por sua vez, deve estar com o modo de desenvolvedor ativo.

Caso ocorram mudanças, uma nova apk pode ser gerada com o comando:

```
cordova 'build --release android'
```

Este comando irá gerar uma cópia não assinada e não alinhada na pasta /platforms/android/build/outputs/apk/android-release-unsigned.apk.

Para gerar uma nova apk será necessário o ANDROIDPATH (comando acima), PATH(comando acima), platform-tools e o aplicativo gradle daemon.

A assinatura pode ser feita utilizando:

```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore CAMINHO/PARA/ARQUIVO/.KEYSTORE CAMINHO/PARA/ARQUIVO/.APK
```

Para esta aplicação, foi usada a keystore que se encontra na pasta principal com o nome de ielusc-journal-release.keystore, a senha é secreta.

O alinhamento desta apk pode ser feito utilizando o comando:

```
CAMINHO/ATÉ/android-sdk-macosx/build-tools/25.0.3/zipalign -v 4 CAMINHO/ATÉ/android-release-unsigned.apk CAMINHO/DESEJADO/PARA/A/APK/FINAL
```

Quaisquer dúvidas: http://ionicframework.com/docs/v1/guide/publishing.html


Tutoriais Utilizados para a Criação deste Aplicativo
----------
* http://ionicframework.com/getting-started/
* https://stackoverflow.com/questions/27169411/how-to-set-icon-and-splash-screen-in-android-using-ionic-cordova
* https://tableless.com.br/criando-uma-aplicacao-movel-com-ionic-2-e-angular-2-em-dez-passos/
* http://pointdeveloper.com/ionic-change-side-menu-color/
* http://ionicframework.com/docs/v1/guide/publishing.html


TO-DO List
--------------------
Objetivos Primários:

- [ ] Categorias;
- [ ] Ajustes Finais;
- [ ] Barra de compartilhamento na notícia completa.

Contribuindo
--------------------
* Fork the repository on Github;
* Clone the project into your machine;
* Commit your changes to your own branch;
* Push your work to your fork;
* Submit a pull request for review;
