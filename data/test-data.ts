export default class TestData {
    /**
     * 1. 'Facility' dropdown
     *  - Toyko CURA Healthcare Center
     *  - Hongkong CURA Healthcare Center
     *  - Seoul CURA Healthcare Center
     * 2. 'Healthcare Program' radio buttons
     *  - Medicare
     *  - Medicaid
     * - None
     * 3. 'Visit Date' date picker
     *  - 05/10/2025
     *  - 05/11/2025
     *  - 05/12/2025
     */
    static makeAppointmentTestData() {
        return [
            { testID: 'TC-001', facility: 'Tokyo CURA Healthcare Center', hcp: 'Medicare', visitDt: '05/10/2025' }, // Note that the array key names use camel case
            { testID: 'TC-002', facility: 'Hongkong CURA Healthcare Center', hcp: 'Medicaid', visitDt: '05/11/2025' },
            { testID: 'TC-003', facility: 'Seoul CURA Healthcare Center', hcp: 'None', visitDt: '05/12/2025' },
        ];
    },

    static apiUserCreation() {
        return [
            { name: 'John Doe', job: 'Software Engineer', id: '126', createdAt: '2023-08-01T12:34:56.789Z' },
            { name: 'Jane Smith', job: 'Product Manager', id: '127', createdAt: '2023-08-02T09:15:30.123Z' },
        ];
    }
}
