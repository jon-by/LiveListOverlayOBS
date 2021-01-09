<h1 style="text-align:center;">LiveListOverlayOBS</h1>

LiveListOverlayOBS foi criado com a intenção de exibir em live a fila de pedidos feitas com o twitch reward, mas que também pode ser alimentada manualmente.

<div style="width:100%; margin:0 auto;">
    <img src="./public/listpresentation.gif">
</div>


### Instalação:

A instalação da lista é muito fácil e rápida, você pode fazer o download dos arquivos encontrados nesse repositório ou usar os links que vou fornecer aqui, o resultado será o mesmo, mas por ser mais pratico, vamos usar os links do repositório.

* Instalação do **painel de controle**:

Copie a seguinte URL: `https://jon-by.github.io/LiveListOverlayOBS/controlPanel.html`

Dentro do OBS Studio, clique em: **Visualizar** > **Abas** > **Abas personalizáveis com URL** 

Em nome da aba, coloque o nome que você quer dar a sua lista, em URL, coloque a URL copiada. Clique em **Aplicar** e se tudo der certo, no menu de abas você verá uma nova aba com o nome que você escolheu, clique nela e seu painel de controle deverá abrir.

##### Ao abrir o painel de controle, clique no botão de engrenagem para abrir as configurações e em 'Screen width', Configure a resolução da sua transmissão.

* Instalação do **overlay**:

A instalação do overlay é feita como qualquer outra browser source.

Copie a seguinte URL: `https://jon-by.github.io/LiveListOverlayOBS`

Nas suas fontes clique com o botão direito do mouse, depois em **Adicionar** e em **Navegador**

Dê um nome a sua browser source e clique em **OK**. Depois basta inserir a URL, configurar a altura e largura e clicar em **OK** novamente.

##### Não altere o css personalizado, caso contrário a sua lista pode perder a transparência. 


 Terminando esses passos você deverá ter o painel de controle e o overlay funcionando, agora basta brincar com o layout.

 <h1 style="text-align:center;">Sincronizando com a twitch</h1>

 Para sincronizar sua lista com a twitch, basta abrir o painel de controle da lista e clicar no botão com o icone de um robô.

 * No primeiro input coloque o **seu canal da twitch**
 <br>
 * Nos próximos 3 campos você pode definir até 3 id's de reward, para isso, vá a té o painel de controle de custom reward da twitch e na recompensa que você deseja capturar o ID, marque a opção para exigir que o usuário insira um texto ao resgatar, feito isso, vá até o chat do seu canal e resgate a recompensa, volte até o painel de controle da lista e no final das configurações de sincronização você verá o ID da recompensa que acabou de resgatar, basta copiar e colar no campo de **Add Item Reward ID 1**, faça o mesmo procedimento para os outros campos caso queira que mais de uma recompensa adicione items na lista.


#### comandos para adicionar e remover itens à lista:

Nas configurações de sincronização, você tem comandos para adicionar e remover itens da lista.

* listadd `!listadd follower item a adicionar`
O primeiro parâmetro do comando não pode conter espaço, já o segundo sim.

* listremove `listremove ID`
O listremove recebe como parâmetro o ID a ser excluído.  O ID é a posição que o item se encontra na lista, o primeiro item tem o ID "1" o segundo tem o ID "2".

Você tembém tem a opção de exibir o **Nº** no overlay, deixando mais fácil o processo de encontrar o ID a ser exluído. 

##### Apenas o broadcaster e mods podem adicionar e remover itens à lista
 







####Tec

* Javascript
* Bootstrap 5
* HTML5
* CSS3
* <a href="https://github.com/instafluff/ComfyJS">Comfy</a>
* <a href="https://github.com/Simonwep/pickr"> Pickr</a>