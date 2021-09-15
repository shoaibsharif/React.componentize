import { Tab, Transition } from "@headlessui/react";
import { Fragment } from "react";

const interViewQA = [
  {
    question: "Does drinking coffee make you smarter?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio omnis harum ex labore dolores consectetur ipsam a, illo aliquid voluptate saepe odit quos ipsum praesentium minus quam, error itaque placeat expedita earum beatae, vero magni! Ullam minus odio id nulla veniam assumenda. Cum rerum similique doloremque quam libero explicabo dolorem illum natus, incidunt voluptas eveniet fugit ipsam quidem dicta dolorum delectus voluptates. Distinctio minima laborum est repellendus tempora reiciendis totam perferendis unde dignissimos consequuntur! Sint, sequi! Eius, cumque pariatur? Fuga porro eaque, voluptates, eum quod est pariatur tempora ipsa ducimus hic dignissimos nobis minima magni, velit dolores dolore aspernatur fugit!",
  },
  {
    question: "So you've bought coffee... now what?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repellendus facere nemo dolor sed fugit ullam eligendi perspiciatis quae blanditiis quia obcaecati officiis nesciunt delectus ipsam dicta doloribus non qui ex autem est, fugiat sunt odio alias. Labore quam rem corporis doloribus nihil. Saepe, dolore pariatur rerum ut quaerat numquam eveniet. Magni totam cum, quo eaque nam iure distinctio unde odit tempora omnis rem dicta ipsum sit. Ullam alias omnis amet eum explicabo doloremque nisi nemo architecto neque dolorum voluptatem, incidunt repellat recusandae in expedita mollitia temporibus deleniti qui. Facilis quibusdam nemo rerum consequatur dolorum esse quia fugiat tenetur molestias. Fugit nisi nam aperiam eius molestiae dignissimos ab sunt, in culpa ex ut provident tempora sint harum quisquam illo officia? Ea quam aliquid odit laborum dolorum earum saepe vel dolor non quisquam nihil, illum beatae error. Dolor ducimus debitis, quibusdam iure recusandae sed, eum veniam veritatis dicta tempore hic maxime adipisci commodi numquam aliquam fuga sunt qui sequi corporis. Saepe voluptas molestiae necessitatibus laboriosam, reprehenderit quod atque cum esse illo at ab odit modi corrupti fugiat blanditiis soluta voluptates architecto alias facilis quaerat magnam repellat adipisci illum maxime. Nobis necessitatibus molestias aut, odit labore minus sapiente exercitationem a eius ex animi inventore beatae vitae voluptatum atque suscipit mollitia fugiat vel illo quo deserunt ut rem qui. Earum exercitationem id accusantium? Atque error aut exercitationem tempore neque culpa modi beatae quisquam harum fugiat. Magnam laboriosam eligendi, facere itaque qui eveniet possimus officiis aperiam, minus ratione sequi similique voluptates, exercitationem unde labore a atque voluptas nostrum commodi temporibus. Ad vero provident cupiditate aliquam, dolore vitae amet eos facilis dolores accusantium rerum nam hic quibusdam atque earum rem voluptatem, harum sit! Doloribus necessitatibus quasi nostrum porro nihil dolor non cumque excepturi, saepe illum quaerat officiis, repudiandae hic reprehenderit laborum. Quaerat aliquam cupiditate voluptas?",
  },
  {
    question: "Is tech making coffee better or worse?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto fugiat tempore voluptatibus tenetur libero atque unde eum amet reiciendis, voluptas quam quisquam vero tempora nam, pariatur repellat alias numquam. Dicta vel culpa quia, adipisci cumque sunt quod porro, cum explicabo nulla necessitatibus ad veniam neque fugiat tenetur earum? Libero, dolore nesciunt aspernatur quidem dolor ipsam corrupti, placeat vero ex et recusandae, illo velit exercitationem in labore quasi laboriosam? Minus sed vel molestias beatae. Iste ad, deserunt necessitatibus consequatur perferendis omnis id nostrum, maiores vitae eius aspernatur beatae quos, sint ut laboriosam facilis unde illum natus rerum aperiam? Eveniet nesciunt consectetur sint tempore est officiis blanditiis facilis quam delectus, tenetur voluptatum, soluta, illum odit. In, voluptatem dolorem fugit corrupti fugiat explicabo repellendus natus totam necessitatibus? Nemo optio fugiat in quam temporibus aperiam eveniet aliquid dignissimos, vel necessitatibus quibusdam rerum! Nemo officia ducimus delectus hic consectetur excepturi iste. Laboriosam deleniti autem reiciendis placeat laborum quibusdam, sapiente officia quaerat! Possimus dicta assumenda dignissimos esse quam dolores rem dolorem voluptas quibusdam vel repudiandae error, id numquam repellat expedita enim omnis voluptatum quisquam aperiam libero nesciunt, corporis reprehenderit ullam. Soluta sapiente vero officiis esse repellendus molestiae ratione quos ea sequi aspernatur, voluptas libero iste fuga sunt velit aut natus? Amet voluptatem qui necessitatibus molestiae sequi dolorum consequuntur, doloribus assumenda vitae aspernatur enim repellendus dolore aliquam debitis error quos quam? Inventore odio deleniti tempora sunt mollitia delectus aut deserunt suscipit, dolorum, temporibus impedit! Facilis molestias, unde ipsam odio nostrum, eligendi animi quo eaque dolor soluta ipsa ullam minus nam nesciunt reprehenderit, asperiores in! Aspernatur dolore quasi iste illo hic incidunt ad, neque eum placeat ut omnis ipsum dolorum fugiat voluptatibus quibusdam dignissimos optio ducimus rem similique laudantium numquam enim? Pariatur totam veritatis asperiores consequuntur? Nobis dolorem hic necessitatibus at doloribus magnam minus quidem sint quas numquam, quisquam, consequatur corrupti tenetur rem eos odit autem mollitia in iusto tempore maiores modi. Vitae dolore, rem sequi tenetur doloremque necessitatibus? Eaque ratione ipsum possimus, explicabo blanditiis consectetur corrupti porro provident aliquid iure eligendi qui, fuga, eveniet alias. Doloremque deserunt odio, tenetur quia nam modi itaque blanditiis a numquam eum eos ut ab et mollitia optio atque enim, iste temporibus harum corrupti recusandae. Nesciunt nulla eligendi, porro praesentium architecto omnis doloribus rem consequuntur, amet dolorem quidem numquam ex incidunt laboriosam nemo enim explicabo modi sint quis temporibus fuga harum aut? Hic expedita a mollitia delectus iste vitae, fugiat quisquam molestias!",
  },
  {
    question: "The most innovative things happening in coffee",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa asperiores nam, error eveniet optio fuga. Molestiae pariatur quidem voluptate sed dolores rerum eius sapiente alias ducimus. Itaque ab aliquam illum alias saepe maxime, deleniti, dolore ea inventore velit quod cumque? Fugiat sapiente voluptatibus ea ab est error laboriosam ipsa quasi.",
  },
  {
    question: "Ask Me Anything: 10 answers to your questions about coffee",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, itaque consequatur voluptatem ab tenetur magnam alias impedit doloremque deserunt ad ex reprehenderit iusto quo hic, ipsam molestias, inventore exercitationem sequi temporibus deleniti qui voluptate? Similique labore qui placeat recusandae debitis, ad facilis tempora doloremque, a adipisci natus cum minus deserunt necessitatibus, corporis exercitationem dolorem enim quos. Eaque excepturi, unde ex hic beatae magni qui provident error porro cupiditate quas atque facilis nostrum numquam velit consequatur expedita sed quibusdam. Tenetur placeat explicabo assumenda et aliquid, laborum animi, quos sapiente dignissimos id doloribus dolores, magnam blanditiis ut fuga incidunt quisquam in nesciunt unde debitis expedita? Ex explicabo aliquid, nemo illo quaerat fuga maxime ipsa sint a ad. Minus rerum molestiae excepturi! Numquam voluptatem cumque ab quidem vel eius assumenda corporis sit ipsa aperiam. Dolor animi quia adipisci, magnam nulla voluptates sit ipsam, optio, qui numquam nihil hic quidem earum harum alias iste. Cumque, libero dolore. Accusantium atque illo eius nostrum voluptatum. Libero distinctio obcaecati quos saepe id reiciendis eveniet expedita ipsam, earum fugiat excepturi natus neque molestias, nostrum cum hic minus voluptatem eum. Ea aut explicabo officia delectus eveniet ex sit nesciunt, soluta iste ducimus, in corrupti voluptate quae dolorum impedit quaerat vel ipsum voluptatum culpa. Consectetur, quis dignissimos in, cupiditate ducimus laudantium ab sint quisquam quibusdam cum perferendis molestias? Doloremque dolore laboriosam saepe possimus veniam, eaque atque ad mollitia quo! Fuga quam, itaque quas aliquam cumque sapiente illum explicabo dolorem placeat consequatur aperiam quo iusto ullam voluptate fugit ipsum hic vero architecto atque aspernatur. Quis quibusdam doloribus consequuntur blanditiis explicabo iure ipsa deserunt, numquam harum expedita culpa exercitationem porro reiciendis recusandae suscipit alias non reprehenderit quam, minima vel quod, nobis ratione unde repellat! Est, sapiente omnis quam quibusdam expedita nemo! A deleniti architecto atque placeat temporibus rem sequi officiis blanditiis. Cum vitae cumque consectetur vel. Ducimus cumque mollitia deleniti esse fugit veritatis consequatur dolor atque, blanditiis sequi non delectus. Incidunt, atque repudiandae tempore ab qui quis ratione facilis amet optio veniam minus, dolorem autem enim eligendi. Sint, hic! Culpa, accusamus quo.",
  },
  {
    question: "The worst advice we've ever heard about coffee",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quod modi expedita quo, eum earum alias at soluta reiciendis enim id facere doloremque, nobis voluptatibus blanditiis corrupti, molestias commodi facilis aut. Numquam maxime unde deserunt repellendus. Veritatis facere maiores numquam voluptatum vitae. Qui in at animi, exercitationem sapiente similique amet necessitatibus ipsam incidunt nemo accusamus, sed et vitae. Aperiam optio rerum quas magni corporis ut distinctio nam quidem necessitatibus, tempora, repudiandae consequuntur consequatur animi praesentium, aspernatur nihil atque neque officia? Aspernatur numquam est aut eum veritatis labore odit nostrum. Enim, ratione. Adipisci magnam molestias, dolorum veritatis incidunt quod ipsam tempora dicta nihil earum eveniet quibusdam, minus suscipit? Unde nisi, nam delectus quo quasi consectetur? At exercitationem natus quisquam. Quod, aliquam nostrum libero laudantium illo odit. Maiores ut aperiam incidunt labore a nam. Iusto iure repellat itaque. Sunt possimus recusandae harum, velit voluptas impedit provident iure nihil natus pariatur eveniet, necessitatibus iusto architecto? Rerum modi, corporis quos commodi placeat in, repellat eveniet molestiae dolorum consequatur esse, ab repudiandae excepturi nemo velit obcaecati illo minima exercitationem. Optio, esse quod! Nesciunt laborum quaerat omnis hic maiores adipisci, doloremque quibusdam sint ullam. Fugiat placeat expedita ex deserunt consequatur. Placeat optio magnam, quos obcaecati, deleniti nemo nostrum cumque modi provident soluta vero maiores nulla, natus perferendis dolor. Temporibus est, praesentium neque ipsa, possimus aliquid ad sint provident cupiditate sequi aspernatur nulla aperiam at consequatur unde voluptas eos laborum eveniet consequuntur natus! Omnis repellat rem commodi nihil similique expedita? Mollitia placeat facilis aliquam! Officiis, vero recusandae!",
  },
  {
    question: "Do you offer technical support",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, quo. Temporibus ab laborum facere, ipsam commodi in fuga incidunt rerum odio animi facilis itaque suscipit, laudantium mollitia sequi totam impedit deserunt reprehenderit aliquam iste! Repellat reiciendis distinctio impedit, at fugiat veniam officia numquam! Excepturi ut nobis cumque vitae exercitationem doloribus labore deleniti blanditiis adipisci iusto similique itaque ipsa, rerum inventore mollitia, officiis quas odit aliquid. Eaque iure possimus facere eius quasi id repellendus placeat consectetur magni, eligendi, quos mollitia saepe autem natus aliquid temporibus voluptatum sint assumenda, architecto qui! Expedita eligendi dolore eius eum quibusdam ipsum debitis qui quisquam provident odit laborum quasi nam quam nostrum, voluptas dicta dolor nemo suscipit velit. Ut ipsum soluta itaque saepe odit ullam distinctio aut, quae consectetur blanditiis, cum nihil quo accusantium quibusdam dolore. Aliquid excepturi, tempora iste adipisci cupiditate dolore fugit consequuntur tenetur dignissimos neque recusandae molestias iure ab, ratione veritatis debitis? Veniam in enim consectetur laboriosam et laborum maiores natus. Ut asperiores deserunt reiciendis temporibus, quia laborum a, consectetur, hic deleniti cupiditate doloremque nihil vel accusantium saepe harum et rerum ad explicabo doloribus nisi. Adipisci non, recusandae repudiandae dolorem commodi pariatur voluptatibus libero enim fuga beatae omnis laborum ratione. Quasi, incidunt officiis? In quam maiores veritatis nostrum explicabo sint debitis similique unde commodi at voluptas molestias, labore doloremque dolor quos consequuntur cumque non odit exercitationem. Dolore, sequi tenetur molestias, totam quo sunt voluptatibus libero illum quidem rem culpa minima, tempora ipsa commodi pariatur impedit beatae est porro! Vitae quisquam ex atque veniam adipisci officia, inventore modi hic accusamus ratione culpa tempora minima eaque earum placeat mollitia molestias? Nam dignissimos atque, nobis praesentium corrupti commodi minima at distinctio exercitationem quisquam iusto aperiam pariatur illo illum, voluptatibus ipsa similique ad et omnis quo. Saepe ad similique nisi delectus esse facilis. Harum esse cum numquam.",
  },
  {
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque.",
    answer:
      "Our themes and templates are developed with clean code and standards. They are developer friendly and easy to use. We have written our styles using SCSS, markup code with comments. Any developer can change easily. We also provided documentation also.",
  },
  {
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque.",
    answer:
      "Our themes and templates are developed with clean code and standards. They are developer friendly and easy to use. We have written our styles using SCSS, markup code with comments. Any developer can change easily. We also provided documentation also.",
  },
  {
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque.",
    answer:
      "Our themes and templates are developed with clean code and standards. They are developer friendly and easy to use. We have written our styles using SCSS, markup code with comments. Any developer can change easily. We also provided documentation also.",
  },
  {
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque.",
    answer:
      "Our themes and templates are developed with clean code and standards. They are developer friendly and easy to use. We have written our styles using SCSS, markup code with comments. Any developer can change easily. We also provided documentation also.",
  },
  {
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque.",
    answer:
      "Our themes and templates are developed with clean code and standards. They are developer friendly and easy to use. We have written our styles using SCSS, markup code with comments. Any developer can change easily. We also provided documentation also.",
  },
  {
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque.",
    answer:
      "Our themes and templates are developed with clean code and standards. They are developer friendly and easy to use. We have written our styles using SCSS, markup code with comments. Any developer can change easily. We also provided documentation also.",
  },
];

const InterViewPrep = () => {
  return (
    <section className="overflow-hidden rounded-lg">
      <header className="flex flex-col items-center justify-between px-6 py-10 text-white bg-indigo-600 md:flex-row">
        <h2 className="text-xl font-bold">Testing Tab</h2>
        <h2>03 Septempber, 2021</h2>
      </header>
      <main>
        <Tab.Group
          vertical
          as="div"
          className="flex flex-col text-left md:flex-row"
        >
          <div
            className="flex-shrink-0 mt-5 overflow-hidden rounded-lg bg-gray-50"
            style={{ flexBasis: "40%" }}
          >
            <Tab.List className="flex flex-col overflow-y-auto divide-y max-h-80 md:max-h-[600px]">
              {interViewQA.map((qa, qaIdx) => (
                <Tab
                  key={`qa-${qaIdx}`}
                  className={({ selected }) =>
                    `px-2 py-3 text-left hover:bg-indigo-500 focus:outline-none hover:text-white ${
                      selected ? "bg-indigo-500  text-white" : ""
                    }`
                  }
                >
                  {qa.question}
                </Tab>
              ))}
            </Tab.List>
          </div>
          <Tab.Panels className="flex-grow h-[600px] overflow-y-auto">
            {interViewQA.map((qa, qaIdx) => (
              <Tab.Panel className="min-h-full m-5" key={`qaPanel-${qaIdx}`}>
                {({ selected }) => (
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-1000 transform"
                    enterFrom="opacity-0 -translate-x-5"
                    enterTo="opacity-1 translate-x-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    show={selected}
                  >
                    <div>{qa.answer}</div>
                  </Transition>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </main>
    </section>
  );
};

export default InterViewPrep;
