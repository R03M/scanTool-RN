import { currentLanguage } from "./currentLanguaje";

const language = {
  en: {
    wait: "Wait",
    msgRemoved: "Number of codes removed : ",
    msgDelList: "Are you sure you want to delete the list: ",
    cancel: "CANCEL",
    delete: "DELETE",
    deleteCList: "DELETE CURRENT LIST",
    newUpdate: "NEW UPDATE",
    scanCodes: "SCANNED",
    copy: "COPY TO CLIPBOARD",
    givePermis: "GIVE PERMISSIONS",
    torchOn: "TORCH ON",
    offTorch: "OFF TORCH",
    onScan: "ON SCAN",
    offScan: "OFF SCAN",
    sendToPc: "SEND CODES TO PC",
    sendToPcOn: "SENDING CODES TO PC",
    clipboardMsg: "WAS COPIED TO CLIPBOARD",
    zoom: "Zoom",
    qrList: "QR Codes in List ",
    qSendC: "Send codes to PC ?",
    channelName: "Channel Name",
    activate: "Activate",
    firstName: "First you need a channel name",
    channelNameInf: " is the name you must use in the PC program.",
    downlodTheV: "Download the new version",
    collection: "MY COLLECTION OF LISTS",
    save: "SAVE",
    nameOfList: "Name of List",
    saveMsg: "A name is required to save the list",
    errorName: "You already have a saved list with that name",
    detailsCurrentL: "Codes",
    sendList: "Send entire list to PC",
    addMore: "Add More",
    hideScanner: "Hide scanner",
    msgNoCodeList: "Without a list of codes, what do you intend to save?",
    msgNoCodesShow: "You don't have codes to inspect",
    update: "UPDATE",
    startUpdate:
    "The download will begin shortly, once downloaded you can start the update",
    options: "OPTIONS",
    close: "CLOSE",
    noListCollection: "You don't have any lists in your collection",
    selectModeScan1: "WITH CAMERA",
    selectModeScan2: "WITH INTEGRATED SCANNER",
    changeMsg:
    "Are you sure you want to switch to integrated scanning mode?\nPlease note that scanning with a built-in scanner is only recommended for devices that have this functionality.\nFor example: Zebra TC21.",
    changeOk: "Change mode",
    mode: "SCANNING: ",
    changeScannerInt: "Switch to Integrated Scanner",
    savedList: 'Saved List',
  },
  es: {
    wait: "Espera",
    msgRemoved: "Cantidad de códigos eliminados : ",
    msgDelList: "Estas seguro de querer eliminar la lista: ",
    cancel: "CANCELAR",
    delete: "ELIMINAR",
    newUpdate: "NUEVA ACTUALIZACIÓN",
    scanCodes: "ESCANEADOS",
    copy: "COPIAR AL PORTAPAPELES",
    givePermis: "DAR PERMISOS",
    torchOn: "ENCENDER LINTERNA",
    offTorch: "APAGAR LINTERNA",
    onScan: "ENCENDER\n ESCÁNER",
    offScan: "APAGAR ESCÁNER",
    sendToPc: "ENVIAR CODIGOS A PC",
    sendToPcOn: "ENVIANDO CODIGOS A PC",
    clipboardMsg: "ENVIADO AL PORTAPAPELES",
    zoom: "Acercamiento",
    qrList: "Códigos QR en la lista ",
    qSendC: "¿ Enviar códigos a PC ?",
    channelName: "Nombre del canal",
    activate: "Activar",
    firstName: "Primero necesita un nombre de canal",
    channelNameInf: " es el nombre que debes usar en el programa de pc.",
    downlodTheV: "Descarga la nueva versión",
    collection: "MI COLECCIÓN DE LISTAS",
    save: "GUARDAR",
    nameOfList: "Nombre de la lista",
    saveMsg: "Se requiere un nombre para guardar la lista",
    errorName: "Ya tienes una lista guardada con ese nombre",
    detailsCurrentL: "Códigos",
    sendList: "Enviar toda la lista a PC",
    addMore: "Añadir más",
    hideScanner: "Ocultar Scaner",
    msgNoCodeList: "Sin una lista de codigos, ¿que pretendes guardar?",
    msgNoCodesShow: "No tienes códigos que inspeccionar",
    update: "ACTUALIZAR",
    startUpdate:
    "La descarga iniciara en breve, una vez descargada puede iniciar la actualización",
    options: "OPCIONES",
    close: "CERRAR",
    deleteCList: "ELIMINAR LISTA ACTUAL",
    noListCollection: "No tienes ninguna lista en tu colección",
    selectModeScan1: "CON CÁMARA",
    selectModeScan2: "CON ESCÁNER INTEGRADO",
    changeScannerInt: "Cambiar a Escáner Integrado",
    changeMsg:
    "¿Está seguro de que desea cambiar al modo de escaneo integrado?\nTenga en cuenta que el escaneo con escáner integrado se recomienda únicamente para dispositivos que cuenten con esta funcionalidad.\nPor ejemplo: Zebra TC21.",
    changeOk: "cambiar modo",
    mode: "ESCANEO: ",
    savedList: 'Lista Guardada',
  },
};

const handlerLanguage = (title) => {
  if (currentLanguage === "es" || currentLanguage === "en") {
    return language[currentLanguage][title];
  } else {
    return language.en[title];
  }
};

export default handlerLanguage;
