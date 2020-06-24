
export class Format {
    static formatDate(d: number, m: number, a: number) {
        console.log(a);
        console.log(m);
        console.log(d);
        let resp = a + '-';
        if (m <= 9) {
            resp = resp + '0' + m + '-';
        } else {
            resp = resp + m + '-';
        }
        if (d <= 9) {
            resp = resp + '0' + d;
        } else {
            resp = resp + d;
        }
        return resp;
    }
    static formatGender(s: string) {
        if (s === 'Masculino') {
            return 1;
        } else {
            return 2;
        }
    }
    static formatOrigin(s: string) {
        if (s === 'Importado') {
            return 2;
        }
        return 1;
    }
}
