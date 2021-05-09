<div>
    <p align="center">
    <img src='https://raw.githubusercontent.com/Projeto-ECOmposteira/documentacao/main/assets/img/logo/logo.png' alt="Projeto Kokama" width="25%"/>
    </p> 
    <h1 align="center">
    Projeto ECOmposteira
    </h1>
</div>

## Microsserviço de Notificação

O presente microsserviço realiza o envio de notificações (e-mails) aos usuários. Portanto, disponibiliza à aplicação rotas para o envio de e-mails com templates diversos, padronizados para o projeto ECOmposteira.

## Rode o Backend com Docker

### Dependências

Inicialmente, instale localmente as seguintes dependências:

1. Instale o [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/);
2. Instale o [Docker Compose](https://docs.docker.com/compose/install/).

### Arquivo de Configuração

1. Crie um arquivo `.env` na raiz do projeto e preencha as variáveis de ambiente de acordo com o arquivo de exemplo `.env.example`. Para desenvolvimento, utilize credenciais do serviço de e-mail [http://ethereal.email/](http://ethereal.email/).

### Inicialização do Projeto

1. Na pasta principal do projeto, construa e inicialize a aplicação com o comando:

```bash
sudo make
```

2. O microsserviço de notificação estará disponível em: `http://localhost:8003/`.
