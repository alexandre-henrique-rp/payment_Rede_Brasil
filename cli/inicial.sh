#!/bin/bash

# Chama controller.sh passando o primeiro argumento
# ./cli/component/controller.sh "$1"


# Chama o script que cria o controller e captura o caminho retornado
caminho_controller=$(./cli/component/controller.sh "$1")

# Verifica se o caminho do controller foi retornado com sucesso
if [ -n "$caminho_controller" ]; then
    echo "O controller foi criado em: $caminho_controller"
else
    echo "Falha ao criar o controller."
fi

# Chama o script que cria o controller e captura o caminho retornado
caminho_route=$(./cli/component/route.sh "$1")

# Verifica se o caminho do route foi retornado com sucesso
if [ -n "$caminho_route" ]; then
    echo "O route foi criado em: $caminho_route"
else
    echo "Falha ao criar o route."
fi

# Chama o script que cria o controller e captura o caminho retornado
caminho_service=$(./cli/component/service.sh "$1")

# Verifica se o caminho do service foi retornado com sucesso
if [ -n "$caminho_service" ]; then
    echo "O service foi editado em: $caminho_service"
else
    echo "Falha ao editar o service."
fi

# Chama o script que cria o controller e captura o caminho retornado
caminho_server=$(./cli/component/server.sh "$1")

# Verifica se o caminho do server foi retornado com sucesso
if [ -n "$caminho_server" ]; then
    echo "O server foi editado em: $caminho_server"
else
    echo "Falha ao editar o server."
fi