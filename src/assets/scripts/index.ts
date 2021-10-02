import dateFormat from "dateformat";
import "./../third-party/jquery/jquery.min.js";
import "./../third-party/semantic/semantic.min.js";

import Profile from "./profile.js";

class Page {
    static idPrefix = "profile";

    static initialize(path: string) {
        $(() => {
            this.initializeNodes();
            this._initalize(path);

        });
        
    }

    static initializeNodes() {
        let tab: any = $('.ui.menu .item');
        tab.tab();
        let progress: any = $('.ui.progress');
        progress.progress();
        
    }

    static _initalize(path: string) {
        let init = (data: any) => {
            let profile = new Profile(data);

            // Title
            $("title").text(`Profile | ${profile.fullName}`);

            // Favicon
            $("link[rel='icon']").attr('href', profile.image);

            // Year
            $(".date-year").text(new Date().getFullYear().toString());
            
            // Image
            $(`#${Page.idPrefix}-image`).attr("src", profile.image);
            
            // Labels
            let container = $(`#${Page.idPrefix}-labels`);
            container.empty();
            for(let i = 0; i < profile.labels.length; i++) {
                let entry = profile.labels[i];
                let temp = Page.getTemplate("#_template-profile-label");
                container.append(temp.text(entry));
                
                if(i < profile.labels.length - 1) container.append(
                    Page.getTemplate("#_template-profile-label-separator")
                );

            }

            // Quote
            $(`#${Page.idPrefix}-quote-text`).text(profile.quote.text);
            $(`#${Page.idPrefix}-quote-author`).text(profile.quote.author);

            for(let key of [
                "givenName",
                "middleName",
                "familyName",
                "gender",
                "sex",
                "civilStatus",
                "religion",
            ]) {
                let id = [this.idPrefix, key].join("-").toLowerCase();
                $(`#${id}`).text((profile as any)[key]);

            }

            // Full Name
            $(`.${Page.idPrefix}-fullname`).text(profile.fullName);
            
            // Birthdate
            $(`#${Page.idPrefix}-birthdate`).text(
                dateFormat(profile.birthdate, "mmmm d, yyyy"));

            // Height
            $(`#${Page.idPrefix}-height`).text(profile.height);

            // Education
            container = $(`#${Page.idPrefix}-education`);
            Page.setContainer(
                container, "#_template-profile-educationentry", profile.education,
                (c, t, e) => {
                    let from = dateFormat(e.date.from, "mmmm yyyy");
                    let to = e.date.to !== null ? dateFormat(e.date.to, "mmmm yyyy")
                        : "Present";
                    $(t.children()[0]).text(`${from} - ${to}`);
                    $(t.children()[1]).text(e.school);
                    $(t.children()[2]).text(e.specialty);

                }

            );
                
            // Mastery
            container = $(`#${Page.idPrefix}-mastery`);
            Page.setContainer(
                container, "#_template-profile-masteryentry", profile.mastery,
                (c, t, e) => {
                    t.find(".label").text(e.label);
                    t.attr("data-percent", e.percentage * 100);
                    t.find(".bar").css("background-color", e.color);
                    
                }
            );
            Page.initializeNodes();

            // Experience
            container = $(`#${Page.idPrefix}-experience`);
            Page.setContainer(
                container, "#_template-profile-experienceentry", profile.experience,
                (c, t, e) => {
                    let from = dateFormat(e.date.from, "mmmm yyyy");
                    let to = e.date.to !== null ? dateFormat(e.date.to, "mmmm yyyy")
                        : "Present";
                    $(t.children()[0]).text(`${from} - ${to}`);
                    $(t.children()[1]).text(e.workplace);
                    $(t.children()[2]).text(e.position);

                }

            );

            // Seminar
            container = $(`#${Page.idPrefix}-seminar`);
            Page.setContainer(
                container, "#_template-profile-seminarentry", profile.seminar,
                (c, t, e) => {
                    $(t.children()[0]).text(dateFormat(e.date, "mmmm dd, yyyy"));
                    $(t.children()[1]).text(e.event);
                    $(t.children()[2]).text(e.venue);

                }

            );

            // Recognition
            container = $(`#${Page.idPrefix}-recognition`);
            Page.setContainer(
                container, "#_template-profile-list-item-subitem", profile.recognition,
                (c, t, e) => {
                    let rt = Page.getTemplate("#_template-profile-list-item-subitem");
                    t.find(".label").text(e.label);
                    t.find(".value").text(dateFormat(e.date, "mmmm yyyy"));
                    t.find(".root").append(rt);

                }

            );

            // Presence
            container = $(`#${Page.idPrefix}-presence`);
            Page.setContainer(
                container, "#_template-profile-presenceentry", profile.presence,
                (c, t, e) => {
                    t.find(".label").text(e.label);
                    t.find(".alias").text(e.alias);
                    t.find("a").attr("href", e.address);
                    t.find("img").attr("src", e.image);

                }

            );
            
        }

        $.getJSON(path, init)

    }

    static getTemplate(id: string) {
        return $(`#_template ${id}`).clone().removeAttr("id");
    
    }

    static setContainer<T>(
        container: JQuery<HTMLElement>,
        entryTemplateId: string,
        entries: T[],
        callback: (container: JQuery<HTMLElement>, entryTemplate: JQuery<HTMLElement>, entry: T) => any) {
        container.empty();
        for(let i = 0; i < entries.length; i++) {
            let entry = entries[i];
            let temp = Page.getTemplate(entryTemplateId);
            container.append(temp);
            if(callback) callback(container, temp, entry);

        }

    }

}

const ProfilePath = "/assets/documents/profile.json";
Page.initialize(ProfilePath);