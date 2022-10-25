/**
 * Represents a network.
 */
export class Network {
    /**
     * Creates a new network with the specified name and identifier byte.
     * @param {string} name Network name.
     * @param {number} identifier Network identifier byte.
     * @param {NetworkTimestampDatetimeConverter} datetimeConverter Network timestamp datetime converter associated with this network.
     * @param {function} addressHasher Gets the primary hasher to use in the public key to address conversion.
     * @param {function} createAddress Creates an encoded address from an address without checksum and checksum bytes.
     * @param {class} AddressClass Address class associated with this network.
     * @param {class} NetworkTimestampClass Network timestamp class associated with this network.
     */
    constructor(name: string, identifier: number, datetimeConverter: NetworkTimestampDatetimeConverter, addressHasher: Function, createAddress: Function, AddressClass: class, NetworkTimestampClass: class);
    name: string;
    identifier: number;
    datetimeConverter: NetworkTimestampDatetimeConverter;
    addressHasher: Function;
    createAddress: Function;
    AddressClass: class;
    NetworkTimestampClass: class;
    /**
     * Converts a public key to an address.
     * @param {PublicKey} publicKey Public key to convert.
     * @returns {Address} Address corresponding to the public key input.
     */
    publicKeyToAddress(publicKey: PublicKey): Address;
    /**
     * Checks if an address string is valid and belongs to this network.
     * @param {string} addressString Address to check.
     * @returns {boolean} True if address is valid and belongs to this network.
     */
    isValidAddressString(addressString: string): boolean;
    /**
     * Checks if an address is valid and belongs to this network.
     * @param {Address} address Address to check.
     * @returns {boolean} True if address is valid and belongs to this network.
     */
    isValidAddress(address: Address): boolean;
    /**
     * Converts a network timestamp to a datetime.
     * @param {NetworkTimestamp} referenceNetworkTimestamp Reference network timestamp to convert.
     * @returns {Date} Datetime representation of the reference network timestamp.
     */
    toDatetime(referenceNetworkTimestamp: NetworkTimestamp): Date;
    /**
     * Converts a datetime to a network timestamp.
     * @param {Date} referenceDatetime Reference datetime to convert.
     * @returns {NetworkTimestamp} Network timestamp representation of the reference datetime.
     */
    fromDatetime(referenceDatetime: Date): NetworkTimestamp;
    /**
     * Returns string representation of this object.
     * @returns {string} String representation of this object
     */
    toString(): string;
}
export namespace NetworkLocator {
    function findByName(networks: array<Network>, singleOrMultipleNames: any): Network;
    function findByIdentifier(networks: array<Network>, singleOrMultipleIdentifiers: any): Network;
}
