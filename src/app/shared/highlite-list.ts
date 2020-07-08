export abstract class HighliteList {
  private selectedRowIndex = -1;

  highlight(row): void {
    this.selectedRowIndex = row.id;
  }

  highlightById(id: number): void {
    this.selectedRowIndex = id;
  }
}
