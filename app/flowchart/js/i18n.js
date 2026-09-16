// Minimal i18n: two static dictionaries (English / Hungarian), a current
// language held in memory and mirrored to localStorage only so the choice
// survives a reload in *this* browser — nothing ever leaves the machine.

const DICTS = {
  en: {
    appTitle: 'Flowchart',
    menuNew: 'New', menuOpen: 'Open…', menuSave: 'Save', menuSaveAs: 'Save As…',
    menuExportImage: 'Export Image', generateCode: 'Generate Source Code',
    programNamePlaceholder: 'Program name',
    clipboardHint: 'right-click a connector to paste, or click here to cancel',
    run: 'Run', step: 'Step', pause: 'Pause', reset: 'Reset', speed: 'Speed',
    tabVariables: 'Variables', tabConsole: 'Console', tabCode: 'Code',
    varName: 'Name', varType: 'Type', varValue: 'Value',
    consolePlaceholder: 'Program output appears here…',
    inputPromptDefault: 'Enter a value for',
    submit: 'Submit',
    copyCode: 'Copy', downloadCode: 'Download .py',
    routineMain: 'Main Program',
    addRoutine: '+ Routine', editRoutine: 'Edit routine', deleteRoutine: 'Delete routine',
    routineName: 'Name', routineKind: 'Kind', kindProcedure: 'Procedure', kindFunction: 'Function',
    returnType: 'Return type', parameters: 'Parameters', addParameter: '+ Parameter',
    paramName: 'Name', paramType: 'Type', remove: 'Remove',
    ok: 'OK', cancel: 'Cancel', save: 'Save', delete: 'Delete', close: 'Close',
    confirmNewProgram: 'Start a new program? Unsaved changes will be lost.',
    confirmDeleteRoutine: 'Delete this routine?',
    confirmDeleteBlock: 'Delete this block?',
    insertBlock: 'Insert symbol',
    editBlock: 'Edit symbol',
    blockDeclare: 'Declare', blockAssign: 'Assign', blockInput: 'Input', blockOutput: 'Output',
    blockIf: 'If', blockWhile: 'While', blockDowhile: 'Do While', blockFor: 'For', blockCall: 'Call',
    blockComment: 'Comment',
    labelExpression: 'Expression', labelCondition: 'Condition', labelPrompt: 'Prompt (optional)',
    labelNewline: 'New line after output', labelStart: 'Start Value', labelEnd: 'End Value', labelStepBy: 'Step Value',
    labelRoutineToCall: 'Routine to call', labelArguments: 'Arguments', labelText: 'Text',
    labelIsArray: 'Array?', labelArraySize: 'Array size',
    labelVariable: 'Variable', labelVariableNames: 'Variable Names (comma-separated)',
    byRef: 'by reference', byRefArgHint: 'This parameter is by reference: enter a plain variable name here.',
    langLabel: 'Language',
    start: 'Start', end: 'End',
    branchTrue: 'True', branchFalse: 'False',
    errUndeclaredVar: (n) => `Variable "${n}" was not declared.`,
    errAlreadyDeclared: (n) => `Variable "${n}" is already declared.`,
    errUnknownRoutine: (n) => `Unknown routine "${n}".`,
    errNotArray: (n) => `Variable "${n}" is not an array.`,
    errArrayNeedsIndex: (n) => `"${n}" is an array — use an index, e.g. ${n}[0].`,
    errIndexOutOfRange: (n) => `Index out of range for array "${n}".`,
    errByRefNeedsVariable: (n) => `Parameter "${n}" is by reference and needs a plain variable name as its argument.`,
    errInvalidAssignTarget: (n) => `"${n}" is not a valid assignment target.`,
    errTooManySteps: 'Execution stopped: too many steps (possible infinite loop).',
    errParse: (m) => `Expression error: ${m}`,
    errRuntime: 'Runtime error',
    errGeneric: 'Error',
    programFinished: 'Program finished.',
    programStopped: 'Program stopped.',
    waitingForInput: 'Waiting for input…',
    nothingToRun: 'Nothing to run yet — build a flowchart first.',
    fileLoadError: 'Could not read this file — it may not be a valid .fprg file.',
    duplicateRoutineName: 'A routine with this name already exists.',
    invalidName: 'Please enter a valid name (letters, digits, underscore, starting with a letter).',
    fitToScreen: 'Fit',
  },
  hu: {
    appTitle: 'Folyamatábra',
    menuNew: 'Új', menuOpen: 'Megnyitás…', menuSave: 'Mentés', menuSaveAs: 'Mentés másként…',
    menuExportImage: 'Kép exportálása', generateCode: 'Forráskód generálása',
    programNamePlaceholder: 'Program neve',
    clipboardHint: 'jobb kattintás egy nyílra a beillesztéshez, vagy kattints ide a törléshez',
    run: 'Futtatás', step: 'Lépés', pause: 'Szünet', reset: 'Visszaállítás', speed: 'Sebesség',
    tabVariables: 'Változók', tabConsole: 'Konzol', tabCode: 'Kód',
    varName: 'Név', varType: 'Típus', varValue: 'Érték',
    consolePlaceholder: 'A program kimenete itt jelenik meg…',
    inputPromptDefault: 'Adj meg egy értéket ehhez:',
    submit: 'Küldés',
    copyCode: 'Másolás', downloadCode: '.py letöltése',
    routineMain: 'Főprogram',
    addRoutine: '+ Eljárás', editRoutine: 'Eljárás szerkesztése', deleteRoutine: 'Eljárás törlése',
    routineName: 'Név', routineKind: 'Típus', kindProcedure: 'Eljárás', kindFunction: 'Függvény',
    returnType: 'Visszatérési típus', parameters: 'Paraméterek', addParameter: '+ Paraméter',
    paramName: 'Név', paramType: 'Típus', remove: 'Eltávolítás',
    ok: 'OK', cancel: 'Mégse', save: 'Mentés', delete: 'Törlés', close: 'Bezárás',
    confirmNewProgram: 'Új program létrehozása? A nem mentett módosítások elvesznek.',
    confirmDeleteRoutine: 'Törlöd ezt az eljárást?',
    confirmDeleteBlock: 'Törlöd ezt az elemet?',
    insertBlock: 'Szimbólum beszúrása',
    editBlock: 'Szimbólum szerkesztése',
    blockDeclare: 'Deklarálás', blockAssign: 'Értékadás', blockInput: 'Beolvasás', blockOutput: 'Kiírás',
    blockIf: 'Elágazás', blockWhile: 'Ciklus (elöltesztelt)', blockDowhile: 'Ciklus (hátultesztelt)', blockFor: 'Számláló ciklus', blockCall: 'Hívás',
    blockComment: 'Megjegyzés',
    labelExpression: 'Kifejezés', labelCondition: 'Feltétel', labelPrompt: 'Felirat (opcionális)',
    labelNewline: 'Új sor a kiírás után', labelStart: 'Kezdő érték', labelEnd: 'Záró érték', labelStepBy: 'Lépésköz',
    labelRoutineToCall: 'Hívandó eljárás', labelArguments: 'Argumentumok', labelText: 'Szöveg',
    labelIsArray: 'Tömb?', labelArraySize: 'Tömb mérete',
    labelVariable: 'Változó', labelVariableNames: 'Változónevek (vesszővel elválasztva)',
    byRef: 'cím szerint', byRefArgHint: 'Ez a paraméter cím szerinti — ide egy egyszerű változónevet írj.',
    langLabel: 'Nyelv',
    start: 'Kezdés', end: 'Vége',
    branchTrue: 'Igaz', branchFalse: 'Hamis',
    errUndeclaredVar: (n) => `A(z) "${n}" változó nincs deklarálva.`,
    errAlreadyDeclared: (n) => `A(z) "${n}" változó már deklarálva van.`,
    errUnknownRoutine: (n) => `Ismeretlen eljárás: "${n}".`,
    errNotArray: (n) => `A(z) "${n}" nem tömb.`,
    errArrayNeedsIndex: (n) => `A(z) "${n}" egy tömb — indexet kell használni, pl. ${n}[0].`,
    errIndexOutOfRange: (n) => `Az index kívül esik a(z) "${n}" tömb határain.`,
    errByRefNeedsVariable: (n) => `A(z) "${n}" paraméter cím szerinti, ezért az argumentumnak egy egyszerű változónévnek kell lennie.`,
    errInvalidAssignTarget: (n) => `A(z) "${n}" nem érvényes értékadási cél.`,
    errTooManySteps: 'A végrehajtás leállt: túl sok lépés (talán végtelen ciklus).',
    errParse: (m) => `Kifejezés hiba: ${m}`,
    errRuntime: 'Futásidejű hiba',
    errGeneric: 'Hiba',
    programFinished: 'A program lefutott.',
    programStopped: 'A program leállítva.',
    waitingForInput: 'Várakozás bevitelre…',
    nothingToRun: 'Nincs mit futtatni — előbb készíts egy folyamatábrát.',
    fileLoadError: 'A fájl nem olvasható — lehet, hogy nem érvényes .fprg fájl.',
    duplicateRoutineName: 'Már létezik ilyen nevű eljárás.',
    invalidName: 'Adj meg egy érvényes nevet (betűk, számok, aláhúzás, betűvel kezdve).',
    fitToScreen: 'Illesztés',
  },
};

let currentLang = 'en';

export function initLang() {
  let saved = null;
  try { saved = localStorage.getItem('flowchart_lang'); } catch { /* ignore */ }
  if (saved && DICTS[saved]) currentLang = saved;
  else currentLang = (navigator.language || '').toLowerCase().startsWith('hu') ? 'hu' : 'en';
  return currentLang;
}

export function setLang(lang) {
  if (!DICTS[lang]) return;
  currentLang = lang;
  try { localStorage.setItem('flowchart_lang', lang); } catch { /* ignore */ }
}

export function getLang() { return currentLang; }

export function t(key, ...args) {
  const entry = DICTS[currentLang][key] ?? DICTS.en[key];
  if (typeof entry === 'function') return entry(...args);
  return entry ?? key;
}
