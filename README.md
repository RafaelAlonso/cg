# Computação Gráfica - Atividade Prática

### Grupo responsável pelo repositório:

- Rafael Alonso (RA 620084)
- Washington Paes (RA 620190)
- William Alves (RA 620203)
#

### Informações
Para o projeto, é utilizada a biblioteca ThreeJS e a linguagem JavaScript, além de HTML.

Os arquivos `Index.js`, `package-lock.json` e `package.json` são utilizados apenas para criar um servidor para rodar o projeto, podendo ser excluidos. O código das atividades encontram-se nas pastas `atividade-01`, `atividade-02` e `atividade-01`, cada qual responsável por sua respectiva parte do projeto.
#

### Atividade 01:
- Visualização de um modelo mais complexo, contendo um número maior de vértices e faces, fornecidos por um arquivo
- Utilização simples de shaders, apenas redimensionamento para o volume de visão (código definido por você!)
- Sem posicionamento correto, textura, iluminação, animação, etc ...

### Atividade 02:
- Visualização de pelo menos dois objetos diferentes;
- Alguma iteração do usuário (teclado ou mouse), movendo pelo menos um dos objetos
- Construção das matrizes na CPU para envio a GPU:
- Matriz de Transformação do modelo (uma diferente para cada modelo);
- Matriz de Visualização (uma para toda a a cena).
- Duas posições distintas de câmeras

### Atividade Final:
-Requisitos básicos (Contendo pelo menos):
- Dois objetos carregados de arquivos
- Cinco objetos no total
- Dois movimentos distintos
- Uma curva de bézier
- Textura em algum modelo obj
- Textura em algum objeto simples
- Shader próprio com cálculo de iluminação phong (em shader próprio)
- Duas posições distintas de câmeras
- Alguma iteração do usuário (teclado ou mouse)
- Um objeto articulado (uso movimento relativo)

Requisitos extras:
- Detecção de colisão;
- Mais objetos, texturas, shaders, cameras, etc ...
#

### Setup
No Mac, abra o terminal na pasta do projeto e utilize os comandos:

```
$ npm install
$ npm run start
```

e então abra no navegador o endereço 'http://localhost:8080' para visualizar o projeto.

No linux recomenda-se usar o simple server do python:

Abra o diretório com o index no terminal e crie um servidor para poder acessar os arquivos localmente

```
$python -m SimpleHTTPServer
```

Abra no navegador o endereço 'http://localhost:8000' para visualizar o projeto.
