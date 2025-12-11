# ✅ CHECKLIST - FACULDADE

## 1️⃣ ATUALIZAR LAMBDAS (Console AWS)

### Lambda-Confirmacao:
1. Abra: https://console.aws.amazon.com/lambda
2. Clique em **Lambda-Confirmacao**
3. Aba **Code** → Clique em `index.js`
4. **Copie e cole** o código de: `lambda-functions/lambda-confirmacao/index.js`
5. Clique **Deploy** (botão laranja)
6. Aguarde "Changes deployed"

### Lambda-Preparacao:
1. Clique em **Lambda-Preparacao**
2. Aba **Code** → Clique em `index.js`
3. **Copie e cole** o código de: `lambda-functions/lambda-preparacao/index.js`
4. Clique **Deploy** (botão laranja)
5. Aguarde "Changes deployed"

---

## 2️⃣ REINICIAR SERVIDOR EC2

```bash
# Conectar no EC2
ssh -i "C:\Users\Matheus\Downloads\ecommerce.pem" ec2-user@18.230.5.181

# Parar servidor antigo
pkill -f "node server.js"

# Ir para pasta
cd api-nuvem

# Iniciar servidor (não morre ao desconectar SSH)
nohup node server.js > server.log 2>&1 &

# Verificar se está rodando
curl http://localhost:3000/health

# Sair do SSH (servidor continua rodando)
exit
```

---

## 3️⃣ LIMPAR PEDIDOS ANTIGOS DO DYNAMODB

1. Abra: https://console.aws.amazon.com/dynamodb
2. Clique em **Tables** → **Pedidos**
3. Aba **Explore table items**
4. **Delete** todos os pedidos antigos (com email @fatec.sp.gov.br)
5. Confirme exclusão

---

## 4️⃣ TESTAR FLUXO COMPLETO

### Criar Pedido:
```bash
curl -X POST http://18.230.5.181:3000/api/pedidos \
-H "Content-Type: application/json" \
-d '{
  "nomeCliente": "Matheus Teste",
  "emailCliente": "porciunculamatheus@gmail.com",
  "valor": 150.00
}'
```

**Esperar:**
- ✅ Email 1: "Pedido Recebido" (imediato)
- ⏰ Aguardar 5 minutos
- ✅ Email 2: "Pedido em Preparação" (após 5 min)

### Fazer Upload do PDF:
```bash
# Substituir COLE_AQUI_O_ID pelo ID do pedido
curl -X POST http://18.230.5.181:3000/api/upload \
-F "file=@nota-fiscal.pdf" \
-F "idPedido=COLE_AQUI_O_ID"
```

**Esperar:**
- ✅ Email 3: "Pedido Enviado - Nota Fiscal" (imediato)

---

## 5️⃣ VERIFICAR STATUS NO DYNAMODB

1. Console DynamoDB → **Pedidos** → **Explore items**
2. Verificar pedido criado:
   - Status deve progredir: `RECEBIMENTO` → `PREPARACAO` → `ENVIADO`

---

## ⚠️ PROBLEMAS COMUNS

### Emails duplicados?
- Status não está atualizando
- Verifique se server.js foi reiniciado na EC2

### Não recebe email?
- Verifique se email está verificado no SES
- Confira logs: `tail -f ~/api-nuvem/server.log`

### Lambda não executa?
- Verifique se clicou **Deploy** após colar código
- Confira Environment Variables (API_URL, DYNAMODB_TABLE)

---

## 📝 INFORMAÇÕES IMPORTANTES

- **EC2 IP:** `18.230.5.181`
- **Email Teste:** `porciunculamatheus@gmail.com`
- **Region:** `sa-east-1` (São Paulo)
- **DynamoDB Table:** `Pedidos`
- **S3 Bucket:** `pedidos-pdf-ecommerce`

---

## 🎯 RESULTADO ESPERADO

1. ✅ 3 emails recebidos (total)
2. ✅ Status final: `ENVIADO`
3. ✅ PDF disponível no S3
4. ✅ Sem duplicações
