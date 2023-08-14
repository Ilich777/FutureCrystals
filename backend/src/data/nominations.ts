/** 
	/backend/src/data/nominations.ts - Store for nominations (like json)
	Copyright (C) 2023  Ilya Zhukov <ilyazhukov24@gmail.com>

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/
interface Nomination {
	nomination_name: string;
    description: string;
    max_mark: number;
}

const cultural/*: Nomination[]*/ = [
	{
		nomination_name: "Победитель Международных творческих конкурсов",
		description: "40 баллов за 1 конкурс",
		max_mark: 40
	},
	{
		nomination_name: "Победитель Международных творческих конкурсов",
		description: "35 баллов за 1 конкурс",
		max_mark: 35
	},
	{
		nomination_name: "Победитель Республиканских творческих конкурсов",
		description: "40 баллов за 1 конкурс",
		max_mark: 40
	},
	{
		nomination_name: "Призер Республиканских творческих конкурсов",
		description: "25 баллов за 1 конкурс",
		max_mark: 25
	},
	{
		nomination_name: "Победитель областных творческих конкурсов",
		description: "20 баллов за 1 конкурс",
		max_mark: 20
	},
	{
		nomination_name: "Призер областных творческих конкурсов",
		description: "15 баллов за 1 конкурс",
		max_mark: 15
	},
	{
		nomination_name: "Победитель городских творческих конкурсов",
		description: "10 баллов за 1 конкурс",
		max_mark: 10
	},
	{
		nomination_name: "Призер городских творческих конкурсов",
		description: "5 баллов за 1 конкурс",
		max_mark: 5
	},
	{
		nomination_name: "Актив ОСТ",
		description: "10 баллов за 1 конкурс",
		max_mark: 10
	},
	{
		nomination_name: "Победитель талантов первокурсников / студенческой весны",
		description: "20 баллов за 1 конкурс",
		max_mark: 20
	},
	{
		nomination_name: "Полученная номинация на таланты первокурсников, студенческая весна",
		description: "10 баллов за 1 конкурс",
		max_mark: 10
	}];

const science: Nomination[] = [
	{
		nomination_name: "Победитель Международных олимпиад",
		description: "40 баллов за 1 конкурс",
		max_mark: 40
	},
	{
		nomination_name: "Призер Международных олимпиад",
		description: "35 баллов за 1 конкурс",
		max_mark: 35
	},
	{
		nomination_name: "Победитель Республиканских олимпиад",
		description: "30 баллов за 1 олимпиаду",
		max_mark: 30
	},
	{
		nomination_name: "Призер Республиканских олимпиад",
		description: "25 баллов за 1 олимпиаду",
		max_mark: 25
	},
	{
		nomination_name: "Победитель областных олимпиад",
		description: "20 баллов за 1 олимпиаду",
		max_mark: 20
	},
	{
		nomination_name: "Призер областных олимпиад",
		description: "15 баллов за 1 олимпиаду",
		max_mark: 15
	},
	{
		nomination_name: "Победитель городских олимпиад",
		description: "10 баллов за 1 олимпиаду",
		max_mark: 10
	},
	{
		nomination_name: "Призер городских олимпиад",
		description: "5 баллов за 1 олимпиаду",
		max_mark: 5
	},
	{
		nomination_name: "Научные статьи, издания",
		description: "15 баллов за каждую",
		max_mark: 15
	},
	{
		nomination_name: "Участие в Международных конференциях",
		description: "30 баллов за каждую",
		max_mark: 30
	},
	{
		nomination_name: "Участие в Республиканских конференциях",
		description: "20 баллов за каждую",
		max_mark: 20
	},
	{
		nomination_name: "Участие в областных конференциях",
		description: "15 баллов за каждую",
		max_mark: 15
	},
	{
		nomination_name: "Участие в городских конференциях",
		description: "10 баллов за каждую",
		max_mark: 10
	}
];

const social: Nomination[] = [
	{
		nomination_name: "Волонтерская, благотворительная деятельность",
		description: "Организация мероприятия = 25 баллов за 1 мероприятие)(Соорганизатор мероприятия = 15 баллов за 1 мероприятие)(Непосредственное участие в мероприятии = 10 баллов за 1 мероприятие",
		max_mark: 25
	},
	{
		nomination_name: "Участие в студенческих объединениях (клубах)",
		description: "Организатор, руководитель объединения = 30 баллов)(Участник объединения = 15 баллов)(Участие в мероприятиях, конкурсах по направлениям деятельности объединения = 10 баллов за 1 мероприятие",
		max_mark: 30
	},
	{
		nomination_name: "Менторство (баллы начисляются ментору группы)",
		description: "Закрепленная группа = 20 баллов)(Среднее значение GPA по группе)(Волонтерская, благотворительная деятельность группы (задействована вся группа) = 5 баллов за 1 мероприятие",
		max_mark: 20
	}
];

const sport: Nomination[] = [
	{
		nomination_name: "Мастер спорта",
		description: "50 баллов",
		max_mark: 50
	},
	{
		nomination_name: "Кандидат мастера спорта",
		description: "30 баллов",
		max_mark: 30
	},
	{
		nomination_name: "Спортивный разряд",
		description: "10 баллов",
		max_mark: 10
	},
	{
		nomination_name: "Победитель Международных соревнований",
		description: "40 баллов за 1 соревнование",
		max_mark: 40
	},
	{
		nomination_name: "Призер Международных соревнований",
		description: "35 баллов за 1 соревнование",
		max_mark: 35
	},
	{
		nomination_name: "Победитель Республиканских соревнований",
		description: "30 баллов за 1 соревнование",
		max_mark: 30
	},
	{
		nomination_name: "Призер республиканских соревнований",
		description: "25 баллов за 1 соревнование",
		max_mark: 25
	},
	{
		nomination_name: "Победитель областных соревнований",
		description: "20 баллов за 1 соревнование",
		max_mark: 20
	},
	{
		nomination_name: "Призер областных соревнований",
		description: "15 баллов за 1 соревнование",
		max_mark: 15
	},
	{
		nomination_name: "Победитель городских соревнований",
		description: "10 баллов за 1 соревнование",
		max_mark: 10
	},
	{
		nomination_name: "Призер городских соревнований",
		description: "5 баллов за 1 соревнование",
		max_mark: 5
	}];

const educational: Nomination[] = [
	{
		nomination_name: "Учебная деятельность (GPA, допольнительное обучение)",
		description: "от 3 до 3,3 = 5 баллов)(от 3,3 до 3,7 = 10 баллов)(от 3,7 до 4 = 15 баллов",
		max_mark: 15
	},
	{
		nomination_name: "Дополнительное обучение на республиканском уровне",
		description: "20 баллов за 1 курс",
		max_mark: 20
	},
	{
		nomination_name: "Участие в семинарах-тренингах республиканского уровня",
		description: "15 баллов за 1 сертификат",
		max_mark: 15
	},
	{
		nomination_name: "Участие в семинарах-тренингах международного уровня",
		description: "25 баллов за 1 сертификат",
		max_mark: 25
	},
	{
		nomination_name: "Наличие языкового сертификата IELTS, TOEFL",
		description: "35 баллов",
		max_mark: 35
	}
];

export const nominationArray = {
	cultural: cultural,
	science: science,
	social: social,
	sport: sport,
	educational:educational
};

export const directionArray = [
	"Культурно-творческая деятельность",
	"Научная деятельность",
	"Общественная деятельность",
	"Спорт",
	"Учебная деятельность"
];
