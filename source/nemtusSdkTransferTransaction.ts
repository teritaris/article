import { SymbolFacade } from "@nemtus/symbol-sdk-typescript/esm/facade/SymbolFacade";
import { PrivateKey } from "@nemtus/symbol-sdk-typescript/esm/CryptoTypes";
import { KeyPair } from "@nemtus/symbol-sdk-typescript/esm/symbol/KeyPair";
import { Signature } from "@nemtus/symbol-sdk-typescript/esm/symbol/models";
import {
    Configuration,
    TransactionRoutesApi,
} from "@nemtus/symbol-sdk-openapi-generator-typescript-axios";

(async () => {
    // ネットワークタイプを指定してSDKを初期化
    const facade = new SymbolFacade("testnet");

    // トランザクションを送信するアカウントの鍵ペアを取得
    const privateKeyString = "AFB4B406B5BF047BE2045E5AB9EA81A7971A854B402D93C10DA2ABA0467271A5";
    const privateKey = new PrivateKey(privateKeyString);
    const keyPair = new KeyPair(privateKey);
    const publicKeyString = keyPair.publicKey.toString();

    // ブロックチェーンの初期ブロックが生成されたときの時間（UnixTime秒）
    const EPOCH_ADJUSTMENT = 1637848847;

    // トランザクションの有効期限
    const now = Date.now();
    const deadline = BigInt(now - EPOCH_ADJUSTMENT * 1000 + 2 * 60 * 60 * 1000);

    // トランザクションの送信先アドレス
    const targetAddressString = "TDMYLKCTEVPSRPTG4UXW47IQPCYNLW2OVWZMLGY";

    // 平文メッセージ
    const messageString = "Hello Symbol!!";
    const messageNumberArray = [0, ...(new TextEncoder()).encode(messageString)];
    const messageUint8Array = new Uint8Array(messageNumberArray);

    // 送信するトークンのID
    const TOKEN_ID = BigInt("0x3A8416DB2D53B6C8");

    // トランザクションのデータ生成
    const transaction = facade.transactionFactory.create({
        type: "transfer_transaction",
        signerPublicKey: publicKeyString,
        deadline,
        recipientAddress: targetAddressString,
        mosaics: [{ mosaicId: TOKEN_ID, amount: 1000000n }],
        message: messageUint8Array
    });

    // 手数料設定
    const feeMultiplier = 100;
    (transaction as any).fee.value = BigInt(
        (transaction as any).size * feeMultiplier
    );

    // 署名
    const signature = facade.signTransaction(keyPair, transaction);
    (transaction as any).signature = new Signature(signature.bytes);

    // トランザクションのハッシュを計算
    const hash = facade.hashTransaction(transaction);
    console.log(hash.toString());
    console.log(`https://testnet.symbol.fyi/transactions/${hash.toString()}`);

    // トランザクション送信時のpayload
    const transactionPayload = (
        facade.transactionFactory.constructor as any
    ).attachSignature(transaction, signature);

    // トランザクションを送信する際の設定情報
    const NODE_URL = "https://sym-test-02.opening-line.jp:3001";
    const configurationParameters = {
        basePath: NODE_URL,
    };
    const configuration = new Configuration(configurationParameters);

    // トランザクションのアナウンス実行(送信)
    try {
        const transactionRoutesApi = new TransactionRoutesApi(configuration);
        console.log(transactionPayload);
        const response = await transactionRoutesApi.announceTransaction({
            transactionPayload,
        });
        console.log(response.data);
    } catch (err) {
        console.error(err);
    }
})();
