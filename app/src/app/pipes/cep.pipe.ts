import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cep",
})
export class CepPipe implements PipeTransform {
  transform(value: any): any {
    if (!value) {
      return "";
    }

    const cep = value.toString();
    if (cep.length !== 8) {
      return value;
    }

    return cep.substring(0, 5) + "-" + cep.substring(5);
  }
}
