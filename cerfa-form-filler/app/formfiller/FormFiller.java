package formfiller;

import models.Situation;
import pdfwriter.PdfWriter;

public abstract class FormFiller {

    protected PdfWriter writer;
    protected Situation situation;

    public void setWriter(PdfWriter writer) {
        this.writer = writer;
        writer.setFontSize(getDefaultFontSize());
        writer.setNumberSpacing(getDefaultNumberSpacing());
    }

    public void setSituation(Situation situation) {
        this.situation = situation;
    }

    public Object[][] getCheckboxes() {
        return new Object[][]{};
    }

    public Object[][] getTextFields() {
        return new Object[][]{};
    }

    public Object[][] getNumberFields() {
        return new Object[][]{};
    }

    protected int getDefaultFontSize() {
        return 8;
    }

    protected float getDefaultNumberSpacing() {
        return 15.5f;
    }

    public abstract void fill();

    public void fillFake() {
        for (Object[] checkbox : getCheckboxes()) {
            int page = (int) checkbox[1];
            float x = checkbox[2] instanceof Float ? (float) checkbox[2] : ((Integer) checkbox[2]).floatValue();
            float y = checkbox[3] instanceof Float ? (float) checkbox[3] : ((Integer) checkbox[3]).floatValue();
            writer.setPage(page);
            writer.checkbox(x, y);
            writer.appendText((String) checkbox[0], x, y + 10, 5);
        }

        for (Object[] textField : getTextFields()) {
            int page = (int) textField[1];
            float x = textField[2] instanceof Float ? (float) textField[2] : ((Integer) textField[2]).floatValue();
            float y = textField[3] instanceof Float ? (float) textField[3] : ((Integer) textField[3]).floatValue();
            int fontSize = 9;
            if (textField.length >= 5) {
                fontSize = (Integer) textField[4];
            }
            writer.setPage(page);
            writer.appendText((String) textField[0], x, y, fontSize);
        }

        for (Object[] numberField : getNumberFields()) {
            appendNumber((String)numberField[0], "00000000000000000000");
        }
    }

    protected void checkbox(String checkboxName) {
        for (Object[] checkbox : getCheckboxes()) {
            if (checkboxName.equals(checkbox[0])) {
                int page = (int) checkbox[1];
                float x = checkbox[2] instanceof Float ? (float) checkbox[2] : ((Integer) checkbox[2]).floatValue();
                float y = checkbox[3] instanceof Float ? (float) checkbox[3] : ((Integer) checkbox[3]).floatValue();
                writer.setPage(page);
                writer.checkbox(x, y);

                return;
            }
        }

        throw new RuntimeException(String.format("Checkbox inexistante : \"%s\"", checkboxName));
    }

    protected void appendText(String textFieldName, String textValue) {
        for (Object[] textField : getTextFields()) {
            if (textFieldName.equals(textField[0])) {
                int page = (int) textField[1];
                float x = textField[2] instanceof Float ? (float) textField[2] : ((Integer) textField[2]).floatValue();
                float y = textField[3] instanceof Float ? (float) textField[3] : ((Integer) textField[3]).floatValue();
                writer.setPage(page);

                if (textField.length >= 5) {
                    writer.appendOptionalText(textValue, x, y, (Integer) textField[4]);
                } else {
                    writer.appendOptionalText(textValue, x, y);
                }

                return;
            }
        }

        throw new RuntimeException(String.format("Champ texte inexistant : \"%s\"", textFieldName));
    }

    protected void appendNumber(String numberFieldName, String number) {
        for (Object[] numberField : getNumberFields()) {
            if (numberFieldName.equals(numberField[0])) {
                int page = (int) numberField[1];
                float x = numberField[2] instanceof Float ? (float) numberField[2] : ((Integer) numberField[2]).floatValue();
                float y = numberField[3] instanceof Float ? (float) numberField[3] : ((Integer) numberField[3]).floatValue();
                writer.setPage(page);

                number = number.substring(0, (int) numberField[4]);
                if (numberField.length >= 6) {
                    writer.setNumberSpacing((float) numberField[5]);
                    writer.appendNumber(number, x, y);
                    writer.setNumberSpacing(getDefaultNumberSpacing());
                } else {
                    writer.appendNumber(number, x, y);
                }

                return;
            }
        }

        throw new RuntimeException(String.format("Champ nombre inexistant : \"%s\"", numberFieldName));
    }
}
