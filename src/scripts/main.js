// Styles
import "./../third_party/semantic/dist/semantic.css";
import "./../styles/main.scss";

// Libraries
import dateFormat from "dateformat";
import "./../third_party/semantic/dist/semantic.js";

// Documents
import profilePath from "./../documents/profile.json";

// TODO: Load assets from json.
const img = require(profilePath["image"] + "");
profilePath["image"] = img;

export class Profile {
    static get _listItem() { return getTemplate("#_template-profile-list-item"); }
    static get _listItemSeparator() { return getTemplate("#_template-profile-list-item-separator"); }
    static get _listItemsubItem() { return getTemplate("#_template-profile-list-item-sub-item"); }

    static get _image() { return $("#profile-image"); }
    static get _fullName() { return $("#profile-full-name"); }
    static get _labels() { return $("#profile-labels"); }
    static get _label() { return getTemplate("#_template-profile-label"); }
    static get _labelSeparator() { return getTemplate("#_template-profile-label-separator"); }
    static get _quoteText() { return $("#profile-quote-text"); }
    static get _quoteAuthor() { return $("#profile-quote-author"); }

    static get _personal() { return $("#profile-personal"); }

    static get _education() { return $("#profile-education"); }
    static get _educationEntry() { return getTemplate("#_template-profile-education-entry"); }

    static get _mastery() { return $("#profile-mastery"); }
    static get _masteryEntry() { return getTemplate("#_template-profile-mastery-entry"); }

    static get _experience() { return $("#profile-experience"); }
    static get _experienceEntry() { return getTemplate("#_template-profile-experience-entry"); }

    static get _seminar() { return $("#profile-seminar"); }
    static get _seminarEntry() { return getTemplate("#_template-profile-seminar-entry"); }

    static get _recognition() { return $("#profile-recognition"); }

    static get _presence() { return $("#profile-presence"); }

    static set image(path) {
        this._image.attr("src", path);

    }

    static set fullName(text) {
        this._fullName.text(text);

    }

    static set labels(values) {
        let labels = this._labels;
        labels.empty();

        for(let i = 0; i < values.length; i++) {
            let text = values[i];
            let label = this._label;
            label.text(text);
            labels.append(label);
            if(i < values.length - 1) {
                let sep = this._labelSeparator;
                labels.append(sep);

            }

        }

    }

    static set quoteText(text) {
        this._quoteText.text(text);

    }

    static set quoteAuthor(text) {
        this._quoteAuthor.text(text);

    }

    static setListItems(container, values) {
        container.empty();

        for(let i = 0; i < values.length; i++) {
            let entryValue = values[i];
            let entry = this._listItem;

            for(let i1 = 0; i1 < entryValue.length; i1++) {
                let subEntryValue = entryValue[i1];
                let subItem = this._listItemsubItem;
                let label = subItem.find(".label");
                let val = subItem.find(".value");
                label.text(subEntryValue[0]);
                val.text(subEntryValue[1]);
                entry.append(subItem);

            }

            container.append(entry);
            if(i < values.length - 1) {
                container.append(this._listItemSeparator);

            }

        }

    }

    static set personal(values) {
        this.setListItems(this._personal, values);

    }

    static set education(values) {
        let container = this._education;
        container.empty();

        for(let i = 0; i < values.length; i++) {
            let entry = this._educationEntry;
            let children = entry.children();
            for(let i1 = 0; i1 < children.length; i1++) {
                let col = children[i1];
                let text = values[i][i1];
                col.replaceChildren(text);

            }
            container.append(entry);

        }

    }

    static set mastery(values) {
        let container = this._mastery;
        container.empty();

        for(let i = 0; i < values.length; i++) {
            let value = values[i];
            let label = value[0];
            let color = value[1];
            let percentage = value[2] * 100;
            let entry = this._masteryEntry;
            entry.find(".label").text(label);
            // entry.find(".bar").addClass(color);
            entry.find(".bar").css("background-color", color);
            entry.attr("data-percent", percentage);
            container.append(entry);

            if(i != values.length - 1) {
                container.append(this._listItemSeparator);

            }

        }

        $('.ui.progress').progress();

    }

    static set experience(values) {
        let container = this._experience;
        container.empty();

        for(let i = 0; i < values.length; i++) {
            let entry = this._experienceEntry;
            let children = entry.children();
            for(let i1 = 0; i1 < children.length; i1++) {
                let col = children[i1];
                let text = values[i][i1];
                col.replaceChildren(text);

            }
            container.append(entry);

        }

    }

    static set seminar(values) {
        let container = this._seminar;
        container.empty();

        for(let i = 0; i < values.length; i++) {
            let entry = this._seminarEntry;
            let children = entry.children();
            for(let i1 = 0; i1 < children.length; i1++) {
                let col = children[i1];
                let text = values[i][i1];
                col.replaceChildren(text);

            }
            container.append(entry);

        }

    }

    static set recognition(values) {
        this.setListItems(this._recognition, values);

    }

    static set presence(values) {
        this.setListItems(this._presence, values);

    }

}

export function getTemplate(id) {
    return $(`#_template ${id}`).clone().removeAttr("id");

}

export function getMonthName(date) {
    return data.toLocaleString("default", {"month": "long"});
}

export function initialize() {
    $('.ui.menu .item').tab();
    $('.ui.progress').progress();

}

export function setProfile(profile) {
    Profile.image = profile.image;
    Profile.fullName = profile.fullName;
    Profile.labels = profile.labels;
    Profile.quoteText = profile.quote.text;
    Profile.quoteAuthor = profile.quote.author;
    
    Profile.personal = profile.personal;
    Profile.education = profile.education;
    Profile.mastery = profile.mastery;
    Profile.experience = profile.experience;
    Profile.seminar = profile.seminar;
    Profile.recognition = profile.recognition;
    Profile.presence = profile.presence;

}

$(() => {
    initialize();
    setProfile(profilePath);
    // $.getJSON(profilePath, (json) => {
    //     let profile = json;
    //     setProfile(profile);

    // });

});